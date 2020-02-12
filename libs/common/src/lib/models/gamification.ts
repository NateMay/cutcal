
export class Reputations {
  chef: ChefReputation;
  nutritionist: NutritionistReputation;
  expert: ExpertReputation; // data contributer
  constructor() {
    this.chef = new ChefReputation();
    this.nutritionist = new NutritionistReputation();
    this.expert = new ExpertReputation();
  }
}

export abstract class ReputationType {
  name: string;
  points: number;
  badges: Badge[];
  constructor(name: string) {
    this.name = name;
    this.points = 0;
    this.badges = [];
  }
}

export class ExpertReputation extends ReputationType {
  points: number;
  badges: Badge[];
  votes: number;
  proposals: number;

  constructor() {
    super('Expert');
    this.votes = 0;
    this.proposals = 0;
  }
}


export class NutritionistReputation extends ReputationType {
  client_weeks: number; // 1 for each consecutive 7 days with a client
  constructor() {
    super('Nutritionist');
    this.client_weeks = 0;
  }
}

export class ChefReputation extends ReputationType {
  points: number;
  badges: Badge[];
  liked_recipes: number;
  created_recipes: number;
  constructor() {
    super('Chef');
    this.liked_recipes = 0;
    this.created_recipes = 0;
  }
}

export class Badge {
  badgeType: string;
  date: Date;
  constructor(badgeType: string) {
    this.badgeType = badgeType;
    this.date = new Date();
  }
}

export const MOCK_REPUTATIONS: Reputations = {
  chef: {
    name: 'Chef',
    points: 120,
    badges: [
      {
        badgeType: 'First Recipe',
        date: new Date()
      }
    ],
    liked_recipes: 10,
    created_recipes: 5
  },
  nutritionist: {
    name: 'Nutritionist',
    points: 400,
    badges: [
      {
        badgeType: 'First Client',
        date: new Date()
      }
    ],
    client_weeks: 20
  },
  expert: {
    name: 'Expert',
    points: 820,
    badges: [
      {
        badgeType: 'Voter',
        date: new Date()
      },
      {
        badgeType: 'Editor',
        date: new Date()
      }
    ],
    votes: 300,
    proposals: 4
  }
}
