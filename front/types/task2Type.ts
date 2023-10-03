type Task2Answer = {
        points: number[][], 
        approximation_by_method: {
            name: string;
            polynomial: string;
            error: number;
            estimated_value: number
        }[], 
        true_value: number
    } 