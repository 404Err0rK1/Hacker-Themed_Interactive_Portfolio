const asciiArtCollection = [
  {
    name: 'hacker',
    art: `
      _____
     /     \\
    /       \\
   /  ^ _ ^  \\
  |  (o) (o)  |
   \\    <    /
    \\  ===  /
     \\_____/
    `,
  },
  {
    name: 'computer',
    art: `
     _____________________
    |  _________________  |
    | |                 | |
    | |     CODE        | |
    | |     RUNS        | |
    | |     HERE        | |
    | |_________________| |
    |  ___ ___ ___   ___  |
    | | 7 | 8 | 9 | | + | |
    | |___|___|___| |___| |
    | | 4 | 5 | 6 | | - | |
    | |___|___|___| |___| |
    | | 1 | 2 | 3 | | x | |
    | |___|___|___| |___| |
    | | . | 0 | = | | / | |
    | |___|___|___| |___| |
    |_____________________|
    `,
  },
  {
    name: 'matrix',
    art: `
     1001010101110
    10100101010101
    0101010010101
    1010101010101
    0101010101010
    1010101010101
    `,
  },
];

class AsciiArtGallery {
  static list() {
    return asciiArtCollection.map((item) => item.name).join(', ');
  }

  static display(name) {
    const artwork = asciiArtCollection.find(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
    if (artwork) {
      return artwork.art;
    } else {
      return `Artwork "${name}" not found. Available artworks: ${this.list()}`;
    }
  }
}

export default AsciiArtGallery;
