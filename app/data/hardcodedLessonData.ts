export const hardcodedLessonData = {
  blocks: [
    {
      id: '1',
      title: 'Foundations of Rome',
      lessons: [
        {
          id: '1',
          title: 'The Founding Myth',
          tasks: [
            {
              id: '1',
              type: 'multipleChoice',
              question: 'Who were the legendary founders of Rome?',
              possibleAnswers: [
                'Romulus and Remus',
                'Caesar and Brutus',
                'Hannibal and Scipio',
                'Augustus and Livia'
              ],
              correctAnswerIndex: 0,
              hint: 'Think of twin brothers raised by a wolf.',
              introText: 'Rome\'s foundation is steeped in myth and legend.',
              postSolutionText: 'Romulus and Remus were twin brothers said to be raised by a she-wolf. Romulus eventually founded Rome, naming it after himself.'
            },
            {
              id: '2',
              type: 'fillInTheBlank',
              question: 'Rome was founded in the year ___ BCE.',
              possibleAnswers: [['753', '725', '800']],
              correctAnswerIndex: [0],
              hint: 'It\'s traditionally dated to the mid-8th century BCE.',
              introText: 'The founding of Rome has a specific traditional date.',
              postSolutionText: '753 BCE is the traditional founding date of Rome, according to Roman tradition.'
            }
          ]
        },
        {
          id: '2',
          title: 'Early Roman Society',
          tasks: [
            {
              id: '1',
              type: 'multipleChoice',
              question: 'What was the ruling class in early Rome called?',
              possibleAnswers: [
                'Patricians',
                'Plebeians',
                'Equites',
                'Consuls'
              ],
              correctAnswerIndex: 0,
              hint: 'They were the aristocratic families of ancient Rome.',
              introText: 'Roman society was highly stratified.',
              postSolutionText: 'Patricians were the ruling class in early Rome, consisting of the oldest and most prestigious families.'
            }
          ]
        }
      ]
    }
  ]
}