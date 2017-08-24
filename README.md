# Ejemplo de graphQLi

Ejemplo básico de llamadas graphQL bajo un endpoint en NODE

#Llamadas

En modo de ejemplo se pueden ejecutar llamadas con el GraphiQL con un navegador
en en la URL http://localhost:4000/football

* Obtener los nombres de los equipos

```
{
  teams
}
```

* Obtener la lista de miembros de un equipo
```
{
  playersList (team: "F.C. Barcelona"){
    firstname
    lastname
  }
}
```
* Obtener información de un jugador en particular

```
{
  player (team: "F.C. Barcelona", num: "10") {
    firstname
    hurray
    goals
    teamMates {
      firstname
      lastname
      goals
      number
    }
  }
}
```
