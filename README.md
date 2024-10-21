Se debe tener instalado Docker para poder correr la aplicacion de forma dockerizada. Esto permite corrrer la aplicacion en cualquier ambiente.

Para correr la aplicion se debe ejecutar:
```bash
docker compose up --build
```

Si se quiere correr la aplicacion en el background para poder seguir usando la terminal o cerrando la terminal se puede correr asi:

```bash
docker compose up --build -d
```

Y para apagar la apliacion

```bash
docker compose down
```

IMPORTANTE: Todo esto se debe ejecutar en el root del proyect. 