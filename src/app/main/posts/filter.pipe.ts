import {  Pipe, PipeTransform } from '@angular/core';
import { FeedInfo } from './feed-info';

const { isArray } = Array;

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(documents: FeedInfo[], find: string): FeedInfo[] {
    if(!documents) return [];
    if(!find) return documents;
    find = find.toLowerCase();
    return search(documents, find);
   }
}

function search(entries: any[], search: string) {
  search = search.toLowerCase();
  return entries.filter(function (obj) {
    const keys = ['feedauthor','feedtext'] ;
    return keys.some(function (key) {
      const value = obj[key];
        return value.toLowerCase().includes(search);
      
    })
  });

  
}