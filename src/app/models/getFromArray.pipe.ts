import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name:'GetFromArray',
})

export class GetFromArray implements PipeTransform{
    transform(array:any=[]):any{
        Object.values(array);
        return array[0];
        
    }
}