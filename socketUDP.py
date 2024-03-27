import socket

def main():
    listen_ip = "0.0.0.0"  # Escucha en todas las interfaces de red
    listen_port = 65535

    # Creamos un socket UDP
    udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    try:
        # Vinculamos el socket al puerto de escucha
        udp_socket.bind((listen_ip, listen_port))
        print("Servidor UDP escuchando en {}:{}".format(listen_ip, listen_port))

        # Escuchamos por mensajes entrantes
        while True:
            message, client_address = udp_socket.recvfrom(1024)  # Tamaño máximo del mensaje es de 1024 bytes
            print("Mensaje recibido de {}: {}".format(client_address, message.decode()))
    except Exception as e:
        print("Error en el servidor:", e)
    finally:
        # Cerramos el socket al terminar
        udp_socket.close()

if __name__ == "__main__":
    main()
