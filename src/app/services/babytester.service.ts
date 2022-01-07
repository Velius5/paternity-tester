import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BabytesterService {
  public models = [{
    name: 'Eye Color',
    id: 'eyecolor',
    type: 'GC',
    category: 'appear',
    genes: [{snp: 'bey', risk: 'a', RAF: 0.47}, {snp: 'gey', risk: 'b', RAF: 0.3}],
    outcomes: [{mut: [[0, '*'], [1, '*']], desc: 'Brown'}, {mut: [[2, 0], [2, 1]], desc: 'Blue'}, {
      mut: [[2, 2]],
      desc: 'Green'
    }],
    images: ['brown-eyes.png', 'blue-eyes.png', 'hazel-eyes.png'],
  }, {
    name: 'Hair Color',
    id: 'haircolor',
    type: 'GC',
    category: 'appear',
    genes: [{snp: 'eum', risk: 'B', RAF: 0.41}, {snp: 'pheo', risk: 'R', RAF: 0.32}],
    outcomes: [{mut: [[2, '*']], desc: 'Black'}, {mut: [[1, '*']], desc: 'Brown'}, {
      mut: [[0, 2]],
      desc: 'Red'
    }, {mut: [[0, 1]], desc: 'Strawberry Blond'}, {mut: [[0, 0]], desc: 'Blond'}],
    images: ['black.png', 'brown.png', 'red.png', 'auburn.png', 'dark-blond.png'],
  }, {
    name: 'Ear lobe',
    id: 'earlobe',
    type: 'GC',
    category: 'appear',
    genes: [{snp: 'earlobe', risk: 'a', RAF: 0.5}],
    outcomes: [{mut: [[0], [1]], desc: 'Unattached'}, {mut: [[2]], desc: 'Attached'}],
  }, {
    name: 'Widow\'s Peak',
    id: 'widowspeak',
    type: 'GC',
    category: 'appear',
    genes: [{snp: 'wp', risk: 'w', RAF: 0.5}],
    outcomes: [{mut: [[0], [1]], desc: 'Has peak'}, {mut: [[2]], desc: 'Has no peak'}],
  }, {
    name: 'Dimples',
    id: 'dimples',
    type: 'GC',
    category: 'appear',
    genes: [{snp: 'wp', risk: 'd', RAF: 0.5}],
    outcomes: [{mut: [[0], [1]], desc: 'Has dimples'}, {mut: [[2]], desc: 'No dimples'}],
  }, {
    name: 'Cleft chin',
    id: 'cleftchin',
    type: 'GC',
    category: 'appear',
    genes: [{snp: 'wp', risk: 'd', RAF: 0.5}],
    outcomes: [{mut: [[0], [1]], desc: 'Cleft chin'}, {mut: [[2]], desc: 'No cleft'}],
  }, {
    name: 'Lactose intolerance',
    id: 'lactose',
    type: 'GC',
    category: 'trait',
    genes: [{snp: 'tolerance', risk: 'g', RAF: 0.57}],
    outcomes: [{mut: [[2]], desc: 'Intolerant'}, {mut: [[1], [0]], desc: 'Tolerant'}],
  }, {
    name: 'Blood Type (ABO)',
    id: 'bloodtype',
    type: 'GC',
    category: 'trait',
    genes: [{snp: 'rs8176719', risk: 'D', RAF: 0.65}, {snp: 'rs8176746', risk: 'G', RAF: 0.88}, {
      snp: 'rs8176747',
      risk: 'G',
      RAF: 0.12
    }, {snp: 'RHD', risk: 'R+', RAF: 0.4}],
    outcomes: [{mut: [[2, '*', '*', '+']], desc: 'Group O+'}, {
      mut: [[2, '*', '*', 0]],
      desc: 'Group O-'
    }, {mut: [[1, 2, 0, '+'], [0, 2, 0, '+']], desc: 'Group A+'}, {
      mut: [[1, 2, 0, 0], [0, 2, 0, 0]],
      desc: 'Group A-'
    }, {
      mut: [[1, 1, 1, '+'], [1, 0, 2, '+'], [0, 0, 2, '+']],
      desc: 'Group B+'
    }, {mut: [[1, 1, 1, 0], [1, 0, 2, 0], [0, 0, 2, 0]], desc: 'Group B-'}, {
      mut: [[0, 1, 1, '+']],
      desc: 'Group AB+'
    }, {mut: [[0, 1, 1, 0]], desc: 'Group AB-'}],
    postprocess(out) {
      let s = 0;
      for (var i = 0; i < out.length; i++)
        {s += out[i].prob;}
      if (s < 0.95 && s != 0) {
        for (var i = 0; i < out.length; i++)
          {out[i].prob /= s;}
      }
      return out;
    },
  }, {
    name: 'Resistance to Norovirus',
    id: 'norovirus',
    type: 'GC',
    category: 'trait',
    genes: [{snp: 'rs601338', risk: 'A', RAF: 0.32}],
    outcomes: [{mut: [[2]], desc: 'Resistant'}, {mut: [[1], [0]], desc: 'Not resistant'}],
  }, {
    name: 'Resistance to HIV/AIDS',
    id: 'hiv',
    type: 'GC',
    category: 'trait',
    genes: [{snp: 'i3003626', risk: 'D', RAF: 0.048}],
    outcomes: [{mut: [[2]], desc: 'Resistant'}, {mut: [[1], [0]], desc: 'Not resistant'}],
  }, {
    name: 'Alcohol Flush Reaction',
    id: 'alcohol',
    type: 'GC',
    category: 'trait',
    genes: [{snp: 'rs671', risk: 'A', RAF: 0.06}],
    outcomes: [{mut: [[2]], desc: 'Extreme'}, {mut: [[1]], desc: 'Moderate'}, {mut: [[0]], desc: 'Little or No'}],
  }];



  constructor() { }

  public getResultsQuick(model, f, m, ff, fm, mf, mm) {
    let out = this.quickGC(model, f, m, ff, fm, mf, mm);
    let s = 0;
    for (var j = 0; j < out.length; j++)
      {s += out[j].prob;}
    if (isNaN(s)) {
      return [{fail: 1, desc: 'This combination of parents\' and child\'s traits does not match the model'}];
    } else if (s !== 0 && s !== 1) {
      for (let j = 0; j < out.length; j++) {
        out[j].prob /= s;
      }
    }
    out = out.map((o) => {
      return {
        prob: (Math.round(o.prob * 10000) / 100),
        out: o.out,
        desc: o.desc
      };
    });
    return out;
  };

  private quickGC(model, ph_f, ph_m, ph_ff, ph_fm, ph_mf, ph_mm) {
    const f = this.phenoToProb(ph_f === -1 ? null : model.outcomes[ph_f], model.genes);
    const m = this.phenoToProb(ph_m === -1 ? null : model.outcomes[ph_m], model.genes);
    if (ph_ff !== -1 || ph_fm !== -1) {
      const ff = this.phenoToProb(ph_ff === -1 ? null : model.outcomes[ph_ff], model.genes);
      const fm = this.phenoToProb(ph_fm === -1 ? null : model.outcomes[ph_fm], model.genes);
      var prob = this.quickPermutate(ff, fm);
      for (let i = 0; i < prob.length; i++) {
        f[i][0] = f[i][0] ? prob[i][0] : 0;
        f[i][1] = f[i][1] ? prob[i][1] : 0;
        f[i][2] = f[i][2] ? prob[i][2] : 0;
        f[i] = this.normArray(f[i]);
      }
    }
    if (ph_mf !== -1 || ph_mm !== -1) {
      const mf = this.phenoToProb(ph_mf === -1 ? null : model.outcomes[ph_mf], model.genes);
      const mm = this.phenoToProb(ph_mm === -1 ? null : model.outcomes[ph_mm], model.genes);
      var prob = this.quickPermutate(mf, mm);
      for (var i = 0; i < prob.length; i++) {
        m[i][0] = m[i][0] ? prob[i][0] : 0;
        m[i][1] = m[i][1] ? prob[i][1] : 0;
        m[i][2] = m[i][2] ? prob[i][2] : 0;
        m[i] = this.normArray(m[i]);
      }
    }
    var prob = this.quickPermutate(f, m);
    let out = this.probToPheno(model, prob);
    if (model.postprocess)
      {out = model.postprocess(out);}
    return out;
  };

  private phenoToProb(outcome, genes) {
    const out: number[][] = Array(genes.length);
    for (let j = 0; j < genes.length; j++) {
      const RAF = genes[j].RAF;
      out[j] = Array.of(0, 0, 0);
      if (outcome === undefined) {
        out[j] = [(1 - RAF) * (1 - RAF), 2 * (1 - RAF) * (RAF), RAF * RAF];
      } else {
        for (var i = 0; i < outcome.mut.length; i++) {
          switch (outcome.mut[i][j]) {
            case 0:
              out[j] = this.addToEachInArray(out[j], [(1 - RAF) * (1 - RAF), 0, 0]);
              break;
            case 1:
              out[j] = this.addToEachInArray(out[j], [0, 2 * (1 - RAF) * (RAF), 0]);
              break;
            case 2:
              out[j] = this.addToEachInArray(out[j], [0, 0, RAF * RAF]);
              break;
            case '*':
              out[j] = this.addToEachInArray(out[j], [(1 - RAF) * (1 - RAF), 2 * (1 - RAF) * (RAF), RAF * RAF]);
              break;
            case '+':
              out[j] = this.addToEachInArray(out[j], [0, 2 * (1 - RAF) * (RAF), RAF * RAF]);
              break;
          }
        }
      }
    }
    for (var i = 0; i < genes.length; i++)
      {out[i] = this.normArray(out[i]);}
    return out;
  };

  private quickPermutate(f, m) {
    const n = f.length;
    const prob = Array(n);
    for (let i = 0; i < n; i++) {
      prob[i] = Array.of(0, 0, 0);
      prob[i][0] = f[i][0] * m[i][0] + 0.5 * f[i][0] * m[i][1] + 0.5 * f[i][1] * m[i][0] + 0.25 * f[i][1] * m[i][1];
      prob[i][1] = 0.5 * f[i][0] * m[i][1] + f[i][0] * m[i][2] + 0.5 * f[i][1] * m[i][0] + 0.5 * f[i][1] * m[i][1] +
        0.5 * f[i][1] * m[i][2] + f[i][2] * m[i][0] +
        0.5 * f[i][2] * m[i][1];
      prob[i][2] = 0.25 * f[i][1] * m[i][1] + 0.5 * f[i][1] * m[i][2] + 0.5 * f[i][2] * m[i][1] + f[i][2] * m[i][2];
      prob[i] = this.normArray(prob[i]);
    }
    return prob;
  };

  private probToPheno(model, prob) {
    const out = Array(model.outcomes.length);
    for (let i = 0; i < model.outcomes.length; i++) {
      out[i] = {prob: 0, out: i, desc: model.outcomes[i].desc};
      for (let j = 0; j < model.outcomes[i].mut.length; j++) {
        out[i].prob += this.calcGCProb(prob, model.outcomes[i].mut[j]);
      }
    }
    return out;
  };

  private calcGCProb(prob, mut) {
    let prb = 1;
    for (let ii = 0; ii < mut.length; ii++) {
      switch (mut[ii]) {
        case '+':
          prb *= (prob[ii][1] + prob[ii][2]);
          break;
        case '*':
          break;
        default:
          prb *= prob[ii][mut[ii]];
          break;
      }
    }
    return prb;
  };

  private addToEachInArray(array, v2: any[]) {
    const out = new Array(array.length);
    for (let i = 0; i < array.length; i++) {
      out[i] = array[i] + v2[i];
    }
    return out;
  }

  private normArray(array: any[]) {
    let sum = 0;
    const out = new Array(array.length);
    for (let i = 0; i < array.length; i++)
    {
      sum += array[i];
    }
    for (let i = 0; i < array.length; i++) {
      out[i] = array[i] / sum;
    }
    return out;
  }

}
