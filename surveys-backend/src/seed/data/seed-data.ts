import { CreateSurveyDto } from 'src/surveys/dto/create-survey.dto';

interface SeedData {
  surveys: CreateSurveyDto[];
  users: SeedUser[];
}

interface SeedUser {
  email: string;
  username: string;
  password: string;
  name: string;
  lastname: string;
  age: number;
}

export const initialData: SeedData = {
  users: [
    {
      username: 'keevsz',
      password: 'P@ssw0rd',
      email: 'keevsz@gmail.com',
      name: 'Kevin',
      lastname: 'Vilca',
      age: 21,
    },
    {
      username: 'same',
      password: 'P@ssw0rd',
      email: 'same@gmail.com',
      name: 'Alex',
      lastname: 'Silva',
      age: 21,
    },
  ],
  surveys: [
    {
      title: 'Encuesta de satisfacción de la tienda en línea',
      questions: [
        {
          item: '¿Está satisfecho con la variedad de productos ofrecidos en la tienda?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Muy satisfecho',
              value: 5,
            },
            {
              description: 'Satisfecho',
              value: 4,
            },
            {
              description: 'Ni satisfecho ni insatisfecho',
              value: 3,
            },
            {
              description: 'Insatisfecho',
              value: 2,
            },
            {
              description: 'Muy insatisfecho',
              value: 1,
            },
          ],
        },
        {
          item: '¿Está satisfecho con la calidad de los productos comprados?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Muy satisfecho',
              value: 5,
            },
            {
              description: 'Satisfecho',
              value: 4,
            },
            {
              description: 'Ni satisfecho ni insatisfecho',
              value: 3,
            },
            {
              description: 'Insatisfecho',
              value: 2,
            },
            {
              description: 'Muy insatisfecho',
              value: 1,
            },
          ],
        },
        {
          item: '¿Recomendaría la tienda en línea a un amigo o familiar?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Definitivamente sí',
              value: 5,
            },
            {
              description: 'Probablemente sí',
              value: 4,
            },
            {
              description: 'No estoy seguro',
              value: 3,
            },
            {
              description: 'Probablemente no',
              value: 2,
            },
            {
              description: 'Definitivamente no',
              value: 1,
            },
          ],
        },
      ],
    },
    {
      title: 'Encuesta de satisfacción de restaurantes',
      questions: [
        {
          item: '¿Cómo calificarías la calidad de la comida?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Excelente',
              value: 5,
            },
            {
              description: 'Muy buena',
              value: 4,
            },
            {
              description: 'Buena',
              value: 3,
            },
            {
              description: 'Regular',
              value: 2,
            },
            {
              description: 'Mala',
              value: 1,
            },
          ],
        },
        {
          item: '¿Cómo calificarías el servicio recibido?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Excelente',
              value: 5,
            },
            {
              description: 'Muy bueno',
              value: 4,
            },
            {
              description: 'Bueno',
              value: 3,
            },
            {
              description: 'Regular',
              value: 2,
            },
            {
              description: 'Malo',
              value: 1,
            },
          ],
        },
        {
          item: '¿Recomendarías este restaurante a un amigo?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Definitivamente sí',
              value: 5,
            },
            {
              description: 'Probablemente sí',
              value: 4,
            },
            {
              description: 'No estoy seguro',
              value: 3,
            },
            {
              description: 'Probablemente no',
              value: 2,
            },
            {
              description: 'Definitivamente no',
              value: 1,
            },
          ],
        },
      ],
    },
    {
      title: 'Encuesta de preferencias',
      questions: [
        {
          item: '¿Qué tipo de música prefieres?',
          valuable: false,
          required: false,
          alternatives: [
            {
              description: 'Rock',
              value: 0,
            },
            {
              description: 'Pop',
              value: 0,
            },
            {
              description: 'Hip-hop',
              value: 0,
            },
            {
              description: 'Reggaeton',
              value: 0,
            },
          ],
        },
        {
          item: '¿En qué ciudad prefieres vivir?',
          valuable: false,
          required: false,
          alternatives: [
            {
              description: 'Ciudad de México',
              value: 0,
            },
            {
              description: 'Nueva York',
              value: 0,
            },
            {
              description: 'Londres',
              value: 0,
            },
            {
              description: 'Tokio',
              value: 0,
            },
          ],
        },
      ],
    },
    {
      title: 'Encuesta de satisfacción de clientes',
      questions: [
        {
          item: '¿Cómo calificaría el servicio de atención al cliente que recibió?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Excelente',
              value: 5,
            },
            {
              description: 'Bueno',
              value: 4,
            },
            {
              description: 'Regular',
              value: 3,
            },
            {
              description: 'Malo',
              value: 2,
            },
            {
              description: 'Muy malo',
              value: 1,
            },
          ],
        },
        {
          item: '¿Cuál es la probabilidad de que recomiende nuestros productos o servicios a otras personas?',
          valuable: false,
          required: true,
          alternatives: [
            {
              description: 'Muy probable',
              value: 0,
            },
            {
              description: 'Probable',
              value: 0,
            },
            {
              description: 'Poco probable',
              value: 0,
            },
            {
              description: 'Nada probable',
              value: 0,
            },
          ],
        },
        {
          item: '¿Qué opina acerca de la calidad de nuestros productos o servicios?',
          valuable: true,
          required: false,
          alternatives: [
            {
              description: 'Excelente',
              value: 5,
            },
            {
              description: 'Bueno',
              value: 4,
            },
            {
              description: 'Regular',
              value: 3,
            },
            {
              description: 'Malo',
              value: 2,
            },
            {
              description: 'Muy malo',
              value: 1,
            },
          ],
        },
        {
          item: '¿Cuál es su nivel de satisfacción con la rapidez de respuesta de nuestro equipo de soporte?',
          valuable: false,
          required: false,
          alternatives: [
            {
              description: 'Muy satisfecho',
              value: 0,
            },
            {
              description: 'Satisfecho',
              value: 0,
            },
            {
              description: 'Poco satisfecho',
              value: 0,
            },
            {
              description: 'Nada satisfecho',
              value: 0,
            },
          ],
        },
      ],
    },
    {
      title: 'Encuesta Familiar',
      questions: [
        {
          item: '¿Cuántos miembros hay en tu familia?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: '1-3',
              value: 3,
            },
            {
              description: '4-6',
              value: 6,
            },
            {
              description: '7 o más',
              value: 10,
            },
          ],
        },
        {
          item: '¿Qué tan seguido se reúne tu familia?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Casi nunca',
              value: 1,
            },
            {
              description: '1 vez al mes',
              value: 3,
            },
            {
              description: '1 vez a la semana',
              value: 5,
            },
            {
              description: 'Más de una vez a la semana',
              value: 7,
            },
          ],
        },
        {
          item: '¿Cómo describirías el ambiente familiar en tu hogar?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Muy positivo',
              value: 5,
            },
            {
              description: 'Positivo',
              value: 4,
            },
            {
              description: 'Neutral',
              value: 3,
            },
            {
              description: 'Negativo',
              value: 2,
            },
            {
              description: 'Muy negativo',
              value: 1,
            },
          ],
        },
        {
          item: '¿Cómo describirías la comunicación entre los miembros de tu familia?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Muy buena',
              value: 5,
            },
            {
              description: 'Buena',
              value: 4,
            },
            {
              description: 'Regular',
              value: 3,
            },
            {
              description: 'Mala',
              value: 2,
            },
            {
              description: 'Muy mala',
              value: 1,
            },
          ],
        },
      ],
    },
    {
      title: 'Encuesta de satisfacción',
      questions: [
        {
          item: '¿Cómo calificarías nuestro servicio de atención al cliente?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Excelente',
              value: 5,
            },
            {
              description: 'Muy bueno',
              value: 4,
            },
            {
              description: 'Bueno',
              value: 3,
            },
            {
              description: 'Regular',
              value: 2,
            },
            {
              description: 'Malo',
              value: 1,
            },
          ],
        },
        {
          item: '¿Qué tan satisfecho estás con la calidad de nuestros productos?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Muy satisfecho',
              value: 5,
            },
            {
              description: 'Satisfecho',
              value: 4,
            },
            {
              description: 'Neutral',
              value: 3,
            },
            {
              description: 'Insatisfecho',
              value: 2,
            },
            {
              description: 'Muy insatisfecho',
              value: 1,
            },
          ],
        },
        {
          item: '¿Recomendarías nuestros productos a otras personas?',
          valuable: true,
          required: false,
          alternatives: [
            {
              description: 'Definitivamente sí',
              value: 5,
            },
            {
              description: 'Probablemente sí',
              value: 4,
            },
            {
              description: 'No estoy seguro',
              value: 3,
            },
            {
              description: 'Probablemente no',
              value: 2,
            },
            {
              description: 'Definitivamente no',
              value: 1,
            },
          ],
        },
      ],
    },
    {
      title: 'Encuesta de satisfacción del cliente',
      questions: [
        {
          item: '¿Con qué frecuencia visita nuestro sitio web?',
          valuable: false,
          required: false,
          alternatives: [
            {
              description: 'Una vez al mes',
              value: 0,
            },
            {
              description: 'Una vez a la semana',
              value: 0,
            },
            {
              description: 'Cada día',
              value: 0,
            },
          ],
        },
        {
          item: '¿Cuál es su opinión general sobre nuestro servicio al cliente?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Muy mala',
              value: 1,
            },
            {
              description: 'Mala',
              value: 2,
            },
            {
              description: 'Regular',
              value: 3,
            },
            {
              description: 'Buena',
              value: 4,
            },
            {
              description: 'Muy buena',
              value: 5,
            },
          ],
        },
        {
          item: '¿Recomendaría nuestro servicio a un amigo o colega?',
          valuable: true,
          required: false,
          alternatives: [
            {
              description: 'Definitivamente no',
              value: 1,
            },
            {
              description: 'Probablemente no',
              value: 2,
            },
            {
              description: 'No estoy seguro',
              value: 3,
            },
            {
              description: 'Probablemente sí',
              value: 4,
            },
            {
              description: 'Definitivamente sí',
              value: 5,
            },
          ],
        },
      ],
    },
    {
      title: 'Encuesta de satisfacción sobre la marca',
      questions: [
        {
          item: '¿Qué tan conoces la marca?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Muy poco',
              value: 1,
            },
            {
              description: 'Algo',
              value: 2,
            },
            {
              description: 'Bastante',
              value: 3,
            },
            {
              description: 'Mucho',
              value: 4,
            },
          ],
        },
        {
          item: '¿Has comprado productos de esta marca en el último año?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Sí',
              value: 1,
            },
            {
              description: 'No',
              value: 0,
            },
          ],
        },
        {
          item: '¿Qué tan satisfecho estás con los productos de esta marca?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Muy satisfecho',
              value: 5,
            },
            {
              description: 'Satisfecho',
              value: 4,
            },
            {
              description: 'Indiferente',
              value: 3,
            },
            {
              description: 'Insatisfecho',
              value: 2,
            },
            {
              description: 'Muy insatisfecho',
              value: 1,
            },
          ],
        },
        {
          item: '¿Recomendarías esta marca a tus amigos o familiares?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Definitivamente sí',
              value: 5,
            },
            {
              description: 'Probablemente sí',
              value: 4,
            },
            {
              description: 'No estoy seguro',
              value: 3,
            },
            {
              description: 'Probablemente no',
              value: 2,
            },
            {
              description: 'Definitivamente no',
              value: 1,
            },
          ],
        },
        {
          item: '¿Qué cambiarías de los productos o servicios de esta marca?',
          valuable: true,
          required: false,
          alternatives: [
            {
              description: 'Definitivamente no',
              value: 1,
            },
          ], //? Respuesta libre, cómo implementar
        },
      ],
    },
    {
      title: 'Encuesta de satisfacción sobre cuidado de animales',
      questions: [
        {
          item: '¿Tienes una mascota?',
          valuable: false,
          required: true,
          alternatives: [
            {
              description: 'Sí',
              value: 1,
            },
            {
              description: 'No',
              value: 0,
            },
          ],
        },
        {
          item: '¿Has llevado a tu mascota al veterinario en el último año?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Sí',
              value: 5,
            },
            {
              description: 'No',
              value: 0,
            },
          ],
        },
        {
          item: '¿Has adoptado alguna vez un animal en un refugio?',
          valuable: true,
          required: false,
          alternatives: [
            {
              description: 'Sí, en los últimos 5 años',
              value: 5,
            },
            {
              description: 'Sí, hace más de 5 años',
              value: 3,
            },
            {
              description: 'No, pero lo he considerado',
              value: 1,
            },
            {
              description: 'No, no me interesa',
              value: 0,
            },
          ],
        },
        {
          item: '¿Has colaborado con alguna organización que proteja animales?',
          valuable: true,
          required: false,
          alternatives: [
            {
              description: 'Sí, en los últimos 6 meses',
              value: 5,
            },
            {
              description: 'Sí, hace más de 6 meses',
              value: 3,
            },
            {
              description: 'No, pero lo he considerado',
              value: 1,
            },
            {
              description: 'No, no me interesa',
              value: 0,
            },
          ],
        },
        {
          item: '¿Qué tipo de alimentos das a tu mascota?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Comida comercial (pienso, latas, etc.)',
              value: 3,
            },
            {
              description: 'Comida casera',
              value: 2,
            },
            {
              description: 'Ambas opciones',
              value: 1,
            },
            {
              description: 'No tengo mascota',
              value: 0,
            },
          ],
        },
      ],
    },
    {
      title: 'Encuesta de satisfacción de celular',
      start_date: '2022-01-01T00:00:00.000Z',
      end_date: '2022-12-31T23:59:59.999Z',
      questions: [
        {
          item: '¿Qué marca de celular posee?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Apple',
              value: 5,
            },
            {
              description: 'Samsung',
              value: 4,
            },
            {
              description: 'Huawei',
              value: 3,
            },
            {
              description: 'Xiaomi',
              value: 2,
            },
            {
              description: 'Otra marca',
              value: 1,
            },
          ],
        },
        {
          item: '¿Con qué frecuencia utiliza su celular para trabajar?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Todos los días',
              value: 5,
            },
            {
              description: 'Casi todos los días',
              value: 4,
            },
            {
              description: 'Algunas veces a la semana',
              value: 3,
            },
            {
              description: 'Raramente',
              value: 2,
            },
            {
              description: 'Nunca',
              value: 1,
            },
          ],
        },
        {
          item: '¿Está satisfecho con la duración de la batería de su celular?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Muy satisfecho',
              value: 5,
            },
            {
              description: 'Satisfecho',
              value: 4,
            },
            {
              description: 'Ni satisfecho ni insatisfecho',
              value: 3,
            },
            {
              description: 'Insatisfecho',
              value: 2,
            },
            {
              description: 'Muy insatisfecho',
              value: 1,
            },
          ],
        },
        {
          item: '¿Con qué frecuencia actualiza su celular a una versión más nueva?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description:
                'Siempre actualizo mi celular a la última versión disponible',
              value: 5,
            },
            {
              description:
                'Frecuentemente actualizo mi celular a versiones más nuevas',
              value: 4,
            },
            {
              description:
                'Actualizo mi celular de vez en cuando a una versión más nueva',
              value: 3,
            },
            {
              description:
                'Raramente actualizo mi celular a una versión más nueva',
              value: 2,
            },
            {
              description: 'Nunca actualizo mi celular a una versión más nueva',
              value: 1,
            },
          ],
        },
      ],
    },
    {
      title: 'Encuesta de satisfacción sobre celulares',
      start_date: '2022-01-01T00:00:00.000Z',
      end_date: '2022-12-31T23:59:59.999Z',
      questions: [
        {
          item: '¿Cuál es la marca de celular que utilizas actualmente?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Apple',
              value: 5,
            },
            {
              description: 'Samsung',
              value: 4,
            },
            {
              description: 'Xiaomi',
              value: 3,
            },
            {
              description: 'Huawei',
              value: 2,
            },
            {
              description: 'Otra',
              value: 1,
            },
          ],
        },
        {
          item: '¿Cómo calificarías la duración de la batería de tu celular?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Excelente',
              value: 5,
            },
            {
              description: 'Buena',
              value: 4,
            },
            {
              description: 'Regular',
              value: 3,
            },
            {
              description: 'Mala',
              value: 2,
            },
            {
              description: 'Pésima',
              value: 1,
            },
          ],
        },
        {
          item: '¿Cuánto tiempo pasas utilizando tu celular cada día?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Menos de 1 hora',
              value: 1,
            },
            {
              description: 'Entre 1 y 2 horas',
              value: 2,
            },
            {
              description: 'Entre 2 y 4 horas',
              value: 3,
            },
            {
              description: 'Entre 4 y 6 horas',
              value: 4,
            },
            {
              description: 'Más de 6 horas',
              value: 5,
            },
          ],
        },
      ],
    },
    {
      title: 'Encuesta de satisfacción - Tottus',
      start_date: '2022-01-01T00:00:00.000Z',
      end_date: '2022-12-31T23:59:59.999Z',
      questions: [
        {
          item: '¿Cuánto has visitado una tienda de Tottus en el último mes?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description:
                'No he visitado una tienda de Tottus en el último mes',
              value: 1,
            },
            {
              description: '1-2 veces al mes',
              value: 2,
            },
            {
              description: '3-4 veces al mes',
              value: 3,
            },
            {
              description: '5 o más veces al mes',
              value: 4,
            },
          ],
        },
        {
          item: '¿Cómo calificarías la limpieza de las tiendas de Tottus?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Muy sucias',
              value: 1,
            },
            {
              description: 'Algo sucias',
              value: 2,
            },
            {
              description: 'Limpia en general',
              value: 3,
            },
            {
              description: 'Muy limpia',
              value: 4,
            },
          ],
        },
        {
          item: '¿Cómo describirías la calidad de los productos que ofrece Tottus?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Mala calidad',
              value: 1,
            },
            {
              description: 'Regular calidad',
              value: 2,
            },
            {
              description: 'Buena calidad',
              value: 3,
            },
            {
              description: 'Excelente calidad',
              value: 4,
            },
          ],
        },
        {
          item: '¿Te parece que los precios de Tottus son competitivos?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Muy caros',
              value: 1,
            },
            {
              description: 'Algo caros',
              value: 2,
            },
            {
              description: 'Precio justo',
              value: 3,
            },
            {
              description: 'Precios muy competitivos',
              value: 4,
            },
          ],
        },
        {
          item: '¿Recomendarías Tottus a familiares o amigos?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Definitivamente no',
              value: 1,
            },
            {
              description: 'Probablemente no',
              value: 2,
            },
            {
              description: 'Probablemente sí',
              value: 3,
            },
            {
              description: 'Definitivamente sí',
              value: 4,
            },
          ],
        },
      ],
    },
    {
      title: 'Encuesta de satisfacción de Agua San Luis',
      start_date: '2022-01-01T00:00:00.000Z',
      end_date: '2022-12-31T23:59:59.999Z',
      questions: [
        {
          item: '¿Con qué frecuencia compras Agua San Luis?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Nunca',
              value: 1,
            },
            {
              description: 'A veces',
              value: 3,
            },
            {
              description: 'Regularmente',
              value: 4,
            },
            {
              description: 'Siempre',
              value: 5,
            },
          ],
        },
        {
          item: '¿Qué tan satisfecho estás con la calidad de Agua San Luis?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Muy insatisfecho',
              value: 1,
            },
            {
              description: 'Insatisfecho',
              value: 2,
            },
            {
              description: 'Ni satisfecho ni insatisfecho',
              value: 3,
            },
            {
              description: 'Satisfecho',
              value: 4,
            },
            {
              description: 'Muy satisfecho',
              value: 5,
            },
          ],
        },
        {
          item: '¿Recomendarías Agua San Luis a un amigo o familiar?',
          valuable: false,
          required: true,
          alternatives: [
            {
              description: 'Sí',
              value: 1,
            },
            {
              description: 'No',
              value: 2,
            },
          ],
        },
      ],
    },
    {
      title: 'Encuesta de preferencias musicales',
      start_date: '2022-01-01T00:00:00.000Z',
      end_date: '2022-12-31T23:59:59.999Z',
      questions: [
        {
          item: '¿Cuál es tu género musical favorito?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Pop',
              value: 5,
            },
            {
              description: 'Rock',
              value: 4,
            },
            {
              description: 'Reggaeton',
              value: 3,
            },
            {
              description: 'Hip Hop',
              value: 2,
            },
            {
              description: 'Clásica',
              value: 1,
            },
          ],
        },
        {
          item: '¿Prefieres la música en inglés o en español?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Inglés',
              value: 5,
            },
            {
              description: 'Español',
              value: 4,
            },
            {
              description: 'Ambos',
              value: 3,
            },
            {
              description: 'No tengo preferencia',
              value: 2,
            },
          ],
        },
        {
          item: '¿Qué estilo de música te hace sentir más relajado?',
          valuable: true,
          required: true,
          alternatives: [
            {
              description: 'Jazz',
              value: 5,
            },
            {
              description: 'Música clásica',
              value: 4,
            },
            {
              description: 'Música ambiental',
              value: 3,
            },
            {
              description: 'Música de meditación',
              value: 2,
            },
            {
              description: 'No me relajo con la música',
              value: 1,
            },
          ],
        },
      ],
    },
  ],
};
