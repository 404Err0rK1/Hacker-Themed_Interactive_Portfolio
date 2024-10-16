class NeuralNetwork {
  constructor(inputNodes, hiddenNodes, outputNodes) {
    this.inputNodes = inputNodes;
    this.hiddenNodes = hiddenNodes;
    this.outputNodes = outputNodes;
    this.weights = {
      inputHidden: this.randomizeWeights(inputNodes, hiddenNodes),
      hiddenOutput: this.randomizeWeights(hiddenNodes, outputNodes),
    };
    this.biases = {
      hidden: new Array(hiddenNodes).fill(0),
      output: new Array(outputNodes).fill(0),
    };
  }

  randomizeWeights(rows, cols) {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => Math.random() * 2 - 1)
    );
  }

  sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }

  feedForward(inputs) {
    const hidden = this.weights.inputHidden.map((row, i) =>
      this.sigmoid(
        row.reduce((sum, weight, j) => sum + weight * inputs[j], 0) + this.biases.hidden[i]
      )
    );

    const outputs = this.weights.hiddenOutput.map((row, i) =>
      this.sigmoid(
        row.reduce((sum, weight, j) => sum + weight * hidden[j], 0) + this.biases.output[i]
      )
    );

    return outputs;
  }

  train(inputs, targets, learningRate = 0.1) {
    // Simple backpropagation
    const hidden = this.weights.inputHidden.map((row, i) =>
      this.sigmoid(
        row.reduce((sum, weight, j) => sum + weight * inputs[j], 0) + this.biases.hidden[i]
      )
    );

    const outputs = this.weights.hiddenOutput.map((row, i) =>
      this.sigmoid(
        row.reduce((sum, weight, j) => sum + weight * hidden[j], 0) + this.biases.output[i]
      )
    );

    const outputErrors = outputs.map((output, i) => targets[i] - output);
    const hiddenErrors = this.weights.hiddenOutput[0].map((_, i) =>
      this.weights.hiddenOutput.reduce((sum, row, j) => sum + row[i] * outputErrors[j], 0)
    );

    // Update weights and biases
    this.weights.hiddenOutput.forEach((row, i) => {
      row.forEach((_, j) => {
        row[j] += learningRate * outputErrors[i] * outputs[i] * (1 - outputs[i]) * hidden[j];
      });
      this.biases.output[i] += learningRate * outputErrors[i] * outputs[i] * (1 - outputs[i]);
    });

    this.weights.inputHidden.forEach((row, i) => {
      row.forEach((_, j) => {
        row[j] += learningRate * hiddenErrors[i] * hidden[i] * (1 - hidden[i]) * inputs[j];
      });
      this.biases.hidden[i] += learningRate * hiddenErrors[i] * hidden[i] * (1 - hidden[i]);
    });

    return outputErrors.reduce((sum, err) => sum + Math.abs(err), 0) / outputErrors.length;
  }

  visualize() {
    const maxNodes = Math.max(this.inputNodes, this.hiddenNodes, this.outputNodes);
    const layers = [this.inputNodes, this.hiddenNodes, this.outputNodes];
    let visualization = '';

    for (let i = 0; i < maxNodes; i++) {
      let row = '';
      layers.forEach((nodeCount, layerIndex) => {
        if (i < nodeCount) {
          row += ' (O) ';
        } else {
          row += '     ';
        }
        if (layerIndex < layers.length - 1) {
          row += '-'.repeat(5);
        }
      });
      visualization += row + '\n';
    }

    return visualization;
  }
}

class NeuralNetworkVisualizer {
  constructor() {
    this.network = null;
  }

  createNetwork(inputNodes, hiddenNodes, outputNodes) {
    this.network = new NeuralNetwork(inputNodes, hiddenNodes, outputNodes);
    return (
      `Network created with ${inputNodes} input nodes, ${hiddenNodes} hidden nodes, and ${outputNodes} output nodes.\n` +
      this.network.visualize()
    );
  }

  trainNetwork(inputs, targets, epochs) {
    if (!this.network) return "No network created. Use 'create' command first.";

    let output = '';
    for (let i = 0; i < epochs; i++) {
      const error = this.network.train(inputs, targets);
      if (i % 100 === 0) {
        output += `Epoch ${i}: Error = ${error.toFixed(4)}\n`;
      }
    }
    return output + 'Training complete.\n' + this.visualizeOutput(this.network.feedForward(inputs));
  }

  runNetwork(inputs) {
    if (!this.network) return "No network created. Use 'create' command first.";
    const outputs = this.network.feedForward(inputs);
    return this.visualizeOutput(outputs);
  }

  visualizeOutput(outputs) {
    let visualization = 'Output:\n';
    outputs.forEach((output, i) => {
      const barLength = Math.round(output * 20);
      visualization += `[${i}]: ${'#'.repeat(barLength)}${'.'.repeat(
        20 - barLength
      )} ${output.toFixed(4)}\n`;
    });
    return visualization;
  }

  processCommand(command) {
    const [action, ...args] = command.split(' ');
    switch (action) {
      case 'create':
        return this.createNetwork(...args.map(Number));
      case 'train':
        const [inputs, targets, epochs] = args
          .join(' ')
          .split('|')
          .map((arr) => JSON.parse(arr));
        return this.trainNetwork(inputs, targets, Number(epochs));
      case 'run':
        return this.runNetwork(JSON.parse(args.join(' ')));
      default:
        return 'Unknown command. Available commands: create, train, run';
    }
  }
}

export default NeuralNetworkVisualizer;
