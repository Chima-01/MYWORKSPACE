function greet (person: string | null) {
  if (typeof person === 'string') {
    console.log(`Hello, ${person}`);
  } else if (person === null) {
    console.log(`No name Porvided!.`)
  }
}