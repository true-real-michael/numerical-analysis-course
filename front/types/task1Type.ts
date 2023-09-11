export type ApproximationType = {
    index: number;
    value: number;
    diff: number;
    error: number;
    residual: number;
  };
  
export type MethodApproximationsType = {
    method_name: string;
    approximations: ApproximationType[];
    n_of_steps: number;
    residual: number;
  };
  
export type SelectedDivisionType = {
    left_bound: number;
    right_bound: number;
    true_value: number;
    approximations_by_method: MethodApproximationsType[];
  };
  
export type Task1Type = {
    n_divisions: number;
    eps: number;
    selected_divisions: SelectedDivisionType[];
  };