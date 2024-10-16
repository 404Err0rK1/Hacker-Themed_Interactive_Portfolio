class CyberpunkQuest {
  constructor() {
    this.gameState = {
      currentRoom: 'start',
      inventory: [],
      flags: {
        terminalHacked: false,
        guardDefeated: false,
        dataExtracted: false,
      },
    };

    this.rooms = {
      start: {
        description:
          "You find yourself in a dimly lit alley. Neon signs flicker overhead. There's a rusty door to the north and a dumpster nearby.",
        exits: { north: 'lobby' },
        items: ['cyberdeck'],
      },
      lobby: {
        description:
          "You're in the lobby of a megacorp building. A security terminal blinks in the corner. Elevators are to the east, and a guard patrols nearby.",
        exits: { south: 'start', east: 'elevator' },
        requires: { terminal: 'terminalHacked', guard: 'guardDefeated' },
      },
      elevator: {
        description:
          "You're in a sleek elevator. Buttons for various floors surround you, but only the top floor button seems to work.",
        exits: { west: 'lobby', up: 'office' },
      },
      office: {
        description:
          "You've reached the CEO's office. A high-tech computer sits on a desk, containing valuable data.",
        exits: { down: 'elevator' },
        items: ['data'],
      },
    };
  }

  start() {
    return this.getDescription();
  }

  processCommand(command) {
    const [action, ...args] = command.toLowerCase().split(' ');
    switch (action) {
      case 'go':
        return this.move(args[0]);
      case 'look':
        return this.getDescription();
      case 'take':
        return this.takeItem(args.join(' '));
      case 'inventory':
        return this.checkInventory();
      case 'use':
        return this.useItem(args.join(' '));
      case 'hack':
        return this.hackTerminal();
      case 'fight':
        return this.fightGuard();
      case 'extract':
        return this.extractData();
      default:
        return "I don't understand that command.";
    }
  }

  move(direction) {
    const currentRoom = this.rooms[this.gameState.currentRoom];
    if (currentRoom.exits[direction]) {
      const nextRoom = currentRoom.exits[direction];
      if (currentRoom.requires) {
        for (let [item, flag] of Object.entries(currentRoom.requires)) {
          if (!this.gameState.flags[flag]) {
            return `You can't go that way. You need to ${item} first.`;
          }
        }
      }
      this.gameState.currentRoom = nextRoom;
      return this.getDescription();
    }
    return "You can't go that way.";
  }

  getDescription() {
    const room = this.rooms[this.gameState.currentRoom];
    let description = room.description;
    if (room.items && room.items.length > 0) {
      description += ` You see: ${room.items.join(', ')}.`;
    }
    return description;
  }

  takeItem(item) {
    const room = this.rooms[this.gameState.currentRoom];
    if (room.items && room.items.includes(item)) {
      this.gameState.inventory.push(item);
      room.items = room.items.filter((i) => i !== item);
      return `You took the ${item}.`;
    }
    return "You can't take that.";
  }

  checkInventory() {
    if (this.gameState.inventory.length === 0) {
      return 'Your inventory is empty.';
    }
    return `You are carrying: ${this.gameState.inventory.join(', ')}.`;
  }

  useItem(item) {
    if (!this.gameState.inventory.includes(item)) {
      return "You don't have that item.";
    }
    if (item === 'cyberdeck' && this.gameState.currentRoom === 'lobby') {
      return this.hackTerminal();
    }
    return "You can't use that here.";
  }

  hackTerminal() {
    if (this.gameState.currentRoom !== 'lobby') {
      return "There's no terminal to hack here.";
    }
    if (!this.gameState.inventory.includes('cyberdeck')) {
      return 'You need a cyberdeck to hack the terminal.';
    }
    this.gameState.flags.terminalHacked = true;
    return "You successfully hack the security terminal, disabling the building's alarms.";
  }

  fightGuard() {
    if (this.gameState.currentRoom !== 'lobby') {
      return "There's no guard here.";
    }
    if (this.gameState.flags.terminalHacked) {
      this.gameState.flags.guardDefeated = true;
      return 'With the alarms disabled, you easily sneak past the guard.';
    }
    return 'The guard is too alert. You need to disable the security systems first.';
  }

  extractData() {
    if (this.gameState.currentRoom !== 'office') {
      return "There's no data to extract here.";
    }
    if (!this.gameState.inventory.includes('data')) {
      return 'You need to take the data first.';
    }
    this.gameState.flags.dataExtracted = true;
    return "Congratulations! You've successfully extracted the secret data and completed your mission!";
  }
}

export default CyberpunkQuest;
