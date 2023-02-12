import  {$Refs} from 'uview-plus'
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties  {
      $refs:$Refs
  }
}
