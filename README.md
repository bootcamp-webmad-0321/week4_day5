# week4_day5

> Express & Mongoose | Create & update documents, Document relationships
>
> Node | Basic Authorization, Autentication & Sessions


## Main points: document relationships (populating)

Para relacionar documentos:
* **En el modelo**: indicar en la propiedad a relacionar `type: Schema.Types.ObjectId` y `ref: 'nombreModelo'`:
    ```javascript
    const thingSchema = new Schema({
      title: String,
      owner: { type : Schema.Types.ObjectId, ref: 'User' },     // 'User' es el nombre del modelo
      price: Number
    })
    ```
* **En el controlador**: para _popular_ una consulta a la BBDD, requerir el modelo populado y pasar como argumento a `.populate()` el nombre del campo que contiene la referencia a oltra colección:
    ```javascript
    require('../models/owner.model')
    
    Thing.find()
      .populate('owner')    // 'owner' es el nombre del campo del modelo 'thing'
      .then(thing => console.log(thing))
    ```

## Main points: session management
Las dependecias `express-session` y `mongo-store` ofrecen configuraciones que permiten gestionar sesiones de usuario:
- La propiedad `req.session.currentUser` almacena el usuario identificado.
- El método `req.session.destroy()` cierra la sesión.


## Main points: *custom middlewares*
- Los *middlewares* son procesos intermedios que el servidor asume en cada petición previo a enrutarla.
- En caso de los *custom middlewares*, es posible crearlos a través de un callback que, argumentado al método `.use()` de Express, tiene acceso a los objetos `res`, `req` y al método `next()`.
- El método `next()` permite abandonar el middleware y continuar con la ejecución del script:
  ````javascript
  app.use((req, res, next) => {
    console.log("---- MIDDLEWARE EXECUTED -----")
    next()
  })
  ````


## Main points: session check
A través de un _custom middleware_  es posible limitar el acceso a ciertas rutas para usuarios no identificados, bloqueando las que se sitúen tras el _blocker_:
```javascript
router.use((req, res, next) => req.session.currentUser ? next() : res.render('forbidden'))
```


