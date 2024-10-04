import { HttpException, HttpStatus } from '@nestjs/common';

// import * as tf from '@tensorflow/tfjs-node';
// import { readFileSync } from 'fs';
// import * as sk from 'scikitjs';
// sk.setBackend(tf);

//population
const POPULATION_SIZE = 60;

// Valid Genes
const GENES: string = 'abcdefghijklmnopqrstuvwxyz';

// Target string to be generated
const TARGET = 'nyoba';

// Function to generate random numbers in given range
function RandomNum(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

// Create random genes for mutation
function MutatedGenes() {
  const len = GENES.length;
  const r = RandomNum(0, len - 1);
  return GENES.charAt(r);
}

// Create chromosome or string of genes
function CreateGnome() {
  const len = TARGET.length;
  let gnome = '';
  for (let i = 0; i < len; i++) {
    gnome += MutatedGenes();
  }
  return gnome;
}

// Class representing individual in population
class Individual {
  Chromosome: any;
  Fitness: number;
  constructor(chromosome) {
    this.Chromosome = chromosome;
    this.Fitness = this.CalculateFitness();
  }

  // Calculate fitness score, it is the number of
  // characters in string which differ from target string.
  CalculateFitness() {
    let fitness = 0;
    for (let i = 0; i < this.Chromosome.length; i++) {
      if (this.Chromosome[i] !== TARGET[i]) {
        fitness++;
      }
    }
    return fitness;
  }

  // Perform mating and produce new offspring
  Mate(parent2) {
    let childChromosome = '';
    for (let i = 0; i < this.Chromosome.length; i++) {
      const p = Math.random();
      if (p < 0.45) childChromosome += this.Chromosome[i];
      else if (p < 0.9) childChromosome += parent2.Chromosome[i];
      else childChromosome += MutatedGenes();
    }
    return new Individual(childChromosome);
  }
}

// Overloading < operator
class FitnessComparer {
  static Compare(ind1, ind2) {
    return ind1.Fitness - ind2.Fitness;
  }
}

// Driver code
function Main() {
  // current generation
  let generation = 0;

  let population = [];
  let found = false;

  // create initial population
  for (let i = 0; i < POPULATION_SIZE; i++) {
    const gnome = CreateGnome();
    population.push(new Individual(gnome));
  }
  console.log(population);
  console.log(population.length);

  while (!found) {
    // sort the population in increasing order of fitness score
    population.sort((a, b) => FitnessComparer.Compare(a, b));

    // if the individual having lowest fitness score ie.
    // 0 then we know that we have reached the target
    // and break the loop
    if (population[0].Fitness === 0) {
      found = true;
      break;
    }

    // Otherwise generate new offsprings for new generation
    const newGeneration = [];

    // Perform Elitism, that means 10% of fittest population
    // goes to the next generation
    let s = Math.floor((10 * POPULATION_SIZE) / 100);
    for (let i = 0; i < s; i++) newGeneration.push(population[i]);

    // From 50% of fittest population, Individuals
    // will mate to produce offspring
    s = Math.floor((90 * POPULATION_SIZE) / 100);
    for (let i = 0; i < s; i++) {
      let r = RandomNum(0, 50);
      const parent1 = population[r];
      r = RandomNum(0, 50);
      const parent2 = population[r];
      const offspring = parent1.Mate(parent2);
      newGeneration.push(offspring);
    }
    population = newGeneration;
    console.log(
      'Generation: ' +
        generation +
        '\t' +
        'String: ' +
        population[0].Chromosome +
        '\t' +
        'Fitness: ' +
        population[0].Fitness,
    );

    generation++;
  }

  console.log(
    'Generation: ' +
      generation +
      '\t' +
      'String: ' +
      population[0].Chromosome +
      '\t' +
      'Fitness: ' +
      population[0].Fitness,
  );
}

export const Test = async (headers: any, connection: any) => {
  try {
    Main();

    return {
      message: 'Data inserted',
    };
  } catch (err) {
    console.error(err);
    await connection.query(`ROLLBACK`);
    throw new HttpException(
      'Error when try insert data',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};
