import socket
import threading
from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)  # Isso permite solicitações de qualquer origem

# Inicializa uma lista vazia para armazenar as informações
registro_ips = []

# Define uma trava para garantir acesso seguro à lista de registro_ips
registro_lock = threading.Lock()

@app.route('/')
def get_hostname_or_ip():
    try:
        client_hostname = socket.gethostbyaddr(request.remote_addr)
        hostname = client_hostname[0]
    except socket.herror:
        # Resolução de nome de host falhou, então use o próprio endereço IP
        hostname = request.remote_addr

    # Obtém a data e hora atual
    data_hora = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Adiciona o IP, o nome de host e a data/hora à lista registro_ips com trava
    with registro_lock:
        registro_ips.append({'ip': request.remote_addr, 'hostname': hostname, 'data_hora': data_hora})

    response_data = {
        'hostname_or_ip': hostname
    }

    return jsonify(response_data)

@app.route('/registro')
def get_registro_ips():
    # Retorna a lista de registro_ips com trava
    with registro_lock:
        return jsonify(registro_ips)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5500)