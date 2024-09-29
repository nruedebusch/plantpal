export interface Recipe {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string;
  ingredients: string[];
  instructions: string[];
  isFeatured: boolean;
}
