import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {Recipe, RecipeDetails} from "./model";

const URL_POST_RECIPE = 'http://localhost:8080/recipe';

@Injectable()
export class RecipeService {

  constructor(private http:HttpClient) {

    }

  getAllRecipes(): Promise<Recipe[]> {
      return lastValueFrom(this.http.get<Recipe[]>('http://localhost:8080/'))
    }

  getRecipeById(recipeId): Promise<RecipeDetails> {
    return lastValueFrom(this.http.get<RecipeDetails>(`http://localhost:8080/recipe/${recipeId}`))
  }

  postRecipeForm(recipeDetails:RecipeDetails): Promise<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    const params = new HttpParams()
      .set('Title', recipeDetails.Title)
      .set('Image', recipeDetails.Image)
      .set('Ingredients', recipeDetails.Ingredients)
      .set('Instruction', recipeDetails.Instruction)


    return lastValueFrom(this.http.post<string>(URL_POST_RECIPE,params.toString(),{headers}));
  }


}
