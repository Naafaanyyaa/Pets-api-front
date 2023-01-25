export interface IInput{
  type: 'default' | 'textarea',//in future using "|" u can add new types
  placeholder: string,
  size?: 'default' | 'small'
  icon?: string,
  error?: string,
  isdisabled: boolean
}
