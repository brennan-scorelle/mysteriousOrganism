// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Creates object representing an organism called P Aequor
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,

    mutate(){
      let selectedBaseIndex = Math.floor(Math.random()*15);
      console.log('The mutated base was ' + dna[selectedBaseIndex] + ' at index of ' + selectedBaseIndex);
      let newBase = '';
      do {
        newBase = returnRandBase();
      } while (this.dna[selectedBaseIndex] === newBase);
      this.dna[selectedBaseIndex] = newBase;
      console.log('The mutated base is now ' + newBase);
    },

    compareDNA(specimen){
      let matchingBaseCount = 0;
      for(i = 0; i < specimen.dna.length; i++){
        if (this.dna[i] === specimen.dna[i]){
          matchingBaseCount++;
        }
      }
      const percentSimilar = (matchingBaseCount/specimen.dna.length)*100; 
      console.log('Specimen #' + this.specimenNum + ' and specimen #' + specimen.specimenNum + ' have ' + percentSimilar + '% DNA in common');
    },
    
    //P. aequor have a higher chance of survival if their DNA is made up of at least 60% 'C' or 'G' bases.
    willLikelySurvive(){
      let CAndGCount = 0;
      for (i=0; i < this.dna.length; i++){
        if (this.dna[i] === 'C' || this.dna[i] === 'G'){
          CAndGCount++;
        }
      }
      const survivalChance = CAndGCount/this.dna.length;
      return survivalChance >= .6 ? true:false;
    }
  };
}

//Creates 30 instances of pAequor that will likely survive in their natural environment
const batch = [];
for (i = 1; batch.length < 30; i++){
  let newSpecimen = pAequorFactory(batch.length+1, mockUpStrand());
  if (newSpecimen.willLikelySurvive()){
    batch.push(newSpecimen);
  };
};
