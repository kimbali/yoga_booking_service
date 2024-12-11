// Generar 30 clases con datos variados
const generateYogaClasses = () => {
  const teachers = [
    'Ana López',
    'Carlos Pérez',
    'María Sánchez',
    'Pedro García',
  ];
  const types = [
    'Hatha Yoga',
    'Vinyasa Yoga',
    'Ashtanga Yoga',
    'Kundalini Yoga',
    'Iyengar Yoga',
    'Yin Yoga',
    'Power Yoga',
  ];
  const startDate = new Date(2024, 11, 12);
  const yogaClasses = [];

  for (let i = 0; i < 30; i++) {
    const randomTeacher = teachers[Math.floor(Math.random() * teachers.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomDuration = Math.random() < 0.8 ? 60 : 90; // 80% de clases de 60 minutos
    const randomLevel = Math.floor(Math.random() * 5) + 1; // Niveles entre 1 y 5
    const randomCapacity = [5, 10, 20][Math.floor(Math.random() * 3)];
    const randomHour = [9, 12, 18][Math.floor(Math.random() * 3)]; // Mañana, mediodía y tarde

    yogaClasses.push({
      title: `Clase de Yoga ${randomType}`,
      description: `Una clase enfocada en ${randomType.toLowerCase()} para mejorar tu bienestar.`,
      date: new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + Math.floor(i / 3),
        randomHour,
        0
      ),
      duration: randomDuration,
      type: randomType,
      level: randomLevel,
      teacher: randomTeacher,
      school: '67594e1c8dfcdcbd4add5cf0',
      capacity: randomCapacity,
      registrations: [],
    });
  }

  return yogaClasses;
};

// Genera y exporta las clases para usarlas
const yogaClasses = generateYogaClasses();
module.exports = yogaClasses;
