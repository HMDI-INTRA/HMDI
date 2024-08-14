<?php

/**
 * Classe PHP para conexão e manipulação de Catracas Henry
 * @autor juliolvfilho
*/

// tempo de liberação da catraca
define('RELEASE_TIME','40');

// comprimento máximo de uma mensagem (em bytes)
define('MSG_MAX_LEN',1024);

/**
 * Considerações Gerais dessa lib
 * As funções dessa classe geralmente apresentam o seguinte funcionamento:
 * Retornam STRING em caso de erro, com a explicação do erro; ou
 * diferente de STRING em caso de sucesso, geralmente algum valor vazio (ex.: false)
 * ou objeto/array no caso de retornar dados
 *
 * Sequência do Funcionamento
 * Instanciar um objeto dessa classe: definir o IP e a Porta
 * Executar as operações disponíveis:
 * - Há somente duas classes de operações disponíveis: Escutar ou Enviar Comando (mensagem).
 * - Durante o processo de Escuta a função 'escutar' permanece bloqueada até receber um evento e então retorna.
 * - As funções de Enviar Comando estão divididas em duas categorias: as que precisam ser executadas após o
 *   o processo de escuta e as que precisam executar antes do processo de escuta.
 *   Uma função da primeira categoria requer o parâmetro INDEX que é retornado numa resposta da função 'escutar'.
 *   Nas funções do segundo tipo você deve invocar 'escutar' após enviar o comando para que ele seja efetivado.
*/

class Catraca
{
    private $ip = '10.20.20.139';
    private $port = 0;
    private $socket = null;

    /**
     * Construtor da classe
     * @param ip | string IPV4
     * @param port | int (default 3000)
    */
    function __construct( $ip , $port = 3000 )
    {
        $this->ip = $ip;
        $this->port = $port;
    }

    function __destruct()
    {
        $this->socket = null;
    }

    /**
     * @return FALSE 
    */
    public function conectar()
    {
        if( !empty($this->socket) ){
            return false; 
        }
        $this->socket = @socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
        if( $this->socket === false ){
            return "socket_create() falhou: ".socket_strerror(socket_last_error());
        }

        @socket_set_option($this->socket, SOL_SOCKET, SO_RCVTIMEO, array('sec'=>30,'usec'=>500));
        $result = @socket_connect($this->socket, $this->ip, $this->port);
        if( $result === false ){
            @socket_close($this->socket);
            $this->socket = null;
            return "socket_connect() falhou: ".socket_strerror(socket_last_error());
        }
        return false;
    }


    /**
     * @return ARRAY com resultado em caso de sucesso ou STRING com a explicação do erro
     * Essa função é bloqueante, isso significa que ela só irá retornar após a catraca enviar uma mensagem
     * fica aguardando indefinidamente enquanto isso.
    */
    public function escutar()
    {
        $erro = $this->conectar();
        if( $erro ) return $erro;

        $response = @socket_read($this->socket, MSG_MAX_LEN); // << função bloqueante
        if( $response === false ){
            $error = socket_last_error();
            @socket_close($this->socket);
            $this->socket = null; // em caso de falha, força a reconexão
            if( $error == 11 ){
                return '_TIMEOUT_'; // retorno especial para este caso
            } else {
                return "socket_read() falhou: ".socket_strerror($error);
            }
        }

        $bytes = unpack('C*', $response);
        $length = count($bytes);
        if( empty($bytes[1]) || $bytes[1] !== 2 ){
            return "interferência na comunicação com o equipamento";
        }
        if( empty($bytes[$length]) || $bytes[$length] !== 3 ){
            return "interferência na comunicação com o equipamento";
        }

        $return = array();
        $return['original_response'] = $response;
        $return['original_response_bytes'] = $bytes;
        $return['size'] = $bytes[2];
        $return['index'] = chr($bytes[4]).chr($bytes[5]);
        $return['command'] = "";
        for($i=7; $bytes[$i]!=43 && $i<$length-1; $i++){
            $return['command'] .= chr($bytes[$i]);
        }
        $return['err_or_version'] = "";
        for($i=$i+1; $bytes[$i]!=43 && $i<$length-1; $i++){
            $return['err_or_version'] .= chr($bytes[$i]);
        }
        $return['data'] = '';
        for($i=$i+1; $i<$length-1; $i++){
            $return['data'] .= chr($bytes[$i]);
        }
        return $return;
    }

    /**
     * Envia a mensagem de liberação da catraca (após escutar)
     * @param index | numero da thread (índice da mensagem)
    */
    public function permitir_entrada($index, $mensagem='ENTRADA LIBERADA')
    {
        return $this->enviar($index,"REON+00+6]".RELEASE_TIME."]$mensagem]2");
    }

    /**
     * Envia uma mensagem de bloqueio da catraca (após escutar)
     * @param index | numero da thread (índice da mensagem)
     * @param mensagem | string motivo do bloqueio
    */
    public function impedir_entrada($index, $mensagem)
    {
        return $this->enviar($index,"REON+00+30]".RELEASE_TIME."]$mensagem]1");
    }

    /**
     * Envia a mensagem de abertura da catraca (antes de escutar)
    */
    public function liberar_entrada($mensagem='SEJA BEM VINDO')
    {
        $index = rand(0,9); // << gera um índíce aleatório qualquer para a mensagem
        return $this->enviar("$index$index","REON+00+4]".RELEASE_TIME."]$mensagem]}1");
    }

    /**
     * Retorna o valor gravado de uma determinada configuração conforme a aba 'Configurações'
     * da planilha 'ProtocoloPrimmeAcesso 8.0.0.50 e Argos .xls'
     * @param parametro | string
    */
    public function get_config($parametro, $garbage_prevent=true)
    {
        if($garbage_prevent) $this->flush(); // limpa o buffer de saída
        $index = rand(0,9); // << gera um índíce aleatório qualquer para a mensagem
        $resposta = $this->enviar("$index$index","RC+00+$parametro");
        if(empty($resposta) ){
            $resposta = $this->escutar();
            if( is_array($resposta) ){
                $params = explode('[', $resposta['data']);
                return $params[1];
            }
        }
        return "ERRO: $resposta";
    }

    /**
     * Grava o valor de uma determinada configuração conforme a aba 'Configurações'
     * da planilha 'ProtocoloPrimmeAcesso 8.0.0.50 e Argos .xls'
     * @param parametro | string
     * @param valor | string
    */
    public function set_config($parametro,$valor)
    {
        $index = rand(0,9); // << gera um índíce aleatório qualquer para a mensagem
        $resposta = $this->enviar("$index$index",'EC+00+'.$parametro.'['.$valor);
        if(empty($resposta) ){
            $resposta = $this->escutar();
        }
        return null;
    }

    /**
     * Grava o valor do dia/hora atual no relógio da catraca
     * @param dia_hora | string = dd/mm/YYYY H:i:s
    */
    public function set_datetime($dia_hora)
    {
        $index = rand(0,9); // << gera um índíce aleatório qualquer para a mensagem
        $resposta = $this->enviar("$index$index","EH+00+$dia_hora]00/00/00]00/00/00");
        if(empty($resposta) ){
            $resposta = $this->escutar();
        }
        return null;
    }

    /**
     * Envia uma mensagem para a catraca
     * @param mensagem | string a ser enviada
    */
    private function enviar($index,$mensagem)
    {
        $erro = $this->conectar();
        if( $erro ) return $erro;

        $mensagem = chr(2).chr(strlen($mensagem)+6).']'.$index.']'.$mensagem.chr(3);
        $bytes_escritos = @socket_write($this->socket, $mensagem, strlen($mensagem));
        if( $bytes_escritos === false ){
            $erro = socket_last_error();
            @socket_close($this->socket);
            $this->socket = null; // em caso de falha, força a reconexão
            return "socket_write() falhou: ".socket_strerror($erro);
        }
        return null;
    }

    /**
     * Limpa o buffer de saída da catraca
    */
    private function flush()
    {
        while($out = @socket_read($this->socket, MSG_MAX_LEN)) {
            // apenas descarta os dados
        }
    }
}
?>
