import socket

ip_catraca = '10.20.20.122'
porta_catraca = 3570
comando_catraca = '1'

mac_catraca = '0:18:E2:05:71:73'

try:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((ip_catraca, porta_catraca))

        # Concatenar o comando e o MAC address antes de enviar
        comando_com_mac = f'{comando_catraca}:{mac_catraca}'
        s.sendall(comando_com_mac.encode())

        resposta = s.recv(1024)
        print(f"Resposta do servidor: {resposta.decode('utf-8')}")

except Exception as e:
    print(f"Erro na comunicação: {e}")
