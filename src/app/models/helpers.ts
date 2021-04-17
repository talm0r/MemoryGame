export interface IScore {
    score: number;
    name: string;
    date: Date;
  }
export const sleep = async (time: number) => {
    return new Promise(resolve => setTimeout(resolve ,time)); 
}

export const colorsArray = ["red","green","blue","yellow","black","brown"];