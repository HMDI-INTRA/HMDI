import ctypes
import os

# Carregar a DLL
dll_path = "EasyInner.dll"  # Certifique-se de que a DLL esteja no mesmo diretório que este script ou forneça o caminho completo
easy_inner = ctypes.CDLL(dll_path)

# Definir as funções da DLL
def definir_tipo_conexao(tipo):
    return easy_inner.DefinirTipoConexao(ctypes.c_ubyte(tipo))

def abrir_porta_comunicacao(porta):
    return easy_inner.AbrirPortaComunicacao(ctypes.c_int(porta))

def fechar_porta_comunicacao():
    easy_inner.FecharPortaComunicacao()

def acionar_rele1(inner):
    return easy_inner.AcionarRele1(ctypes.c_int(inner))

def ping(inner):
    return easy_inner.Ping(ctypes.c_int(inner))

# Função principal
def main():
    # Definir o tipo de conexão (por exemplo, 1 para TCP/IP)
    resultado = definir_tipo_conexao(1)
    print(f"DefinirTipoConexao: {resultado}")

    # Abrir a porta de comunicação (por exemplo, porta 3570 para TCP/IP)
    resultado = abrir_porta_comunicacao(3570)
    print(f"AbrirPortaComunicacao: {resultado}")

    # Verificar a comunicação com o dispositivo (Ping)
    resultado = ping(1)
    print(f"Ping: {resultado}")

    # Acionar o rele 1
    resultado = acionar_rele1(1)
    print(f"AcionarRele1: {resultado}")

    # Fechar a porta de comunicação
    fechar_porta_comunicacao()
    print("Porta de comunicação fechada.")

if __name__ == "__main__":
    main()
