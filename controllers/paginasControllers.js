import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (req, res)=>{ // req -> lo que enviamos |Y| res -> Lo que express nos responde
    // consultar tres viajes del modelo viajes
    
    const promiseDB = [];

    promiseDB.push(Viaje.findAll({limit: 3}));
    promiseDB.push(Testimonial.findAll({limit: 3}));
    try {
        
        const resultado = await Promise.all(promiseDB);
        res.render('inicio',{
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error)
    }   
   
    
}

const paginaNosotros = (req, res)=>{

    res.render('nosotros',{
        pagina: 'Nosotros'
    });

    // Pasar varibales hacia la vista
    // const viaje = 'Viajes'
    // res.render('nosotros',{
    //     viaje
    // });
}

const paginaViajes = async (req, res)=>{
    //Consultar a la BD
    const viajes = await Viaje.findAll();

    res.render('viajes',{
        pagina: 'Próximos Viajes',
        viajes
    })
}

// muestra un viaje por su slug

const paginaDetalleViaje = async (req, res) => {
    
    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where : { slug } });
        res.render('viaje', {
            pageName: 'Información del viaje',
            viaje
        })

    } catch (error) {
        
    }
};


const paginaTestimoniales = async (req, res)=>{

    try {

        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales',{
            pagina: 'Testimoniales',
            testimoniales
        })
    } catch (error) {
        console.log(error)
    }
    
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}