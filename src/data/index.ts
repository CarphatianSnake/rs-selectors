import { ROTaskDataArray } from 'types';

const tasksData: ROTaskDataArray = [
  {
    markup: `<plate></plate>
    <pickle></pickle>
    <plate></plate>
    <bento></bento>`,
    selector: 'plate',
    task: 'Select all plates on the table',
    name: 'tag',
  },
  {
    markup: `<bento></bento>
    <orange></orange>
    <plate id="fancy"></plate>
    <plate></plate>`,
    selector: '#fancy',
    task: 'Select the fancy plate on the table',
    name: '#id',
  },
  {
    markup: `<plate>
    <orange></orange>
    </plate>
    <plate>
    <apple class="small"></apple>
    </plate>
    <bento>
    <orange class="small"></orange>
    </bento>
    <plate id="fancy">
    <apple></apple>
    </plate>`,
    selector: '.small',
    task: 'Select all small fuits',
    name: '.classname',
  },
  {
    markup: `<apple></apple>
    <plate id="fancy">
    <apple class="small"></apple>
    </plate>
    <bento>
    <orange class="small"></orange>
    </bento>
    <apple class="small"></apple>
    <plate></plate>`,
    selector: 'apple.small',
    task: 'Select all small apples on the table',
    name: 'tag.classname',
  },
  {
    markup: `<bento>
    <pickle></pickle>
    </bento>
    <plate id="fancy">
    <orange></orange>
    </plate>
    <apple></apple>
    <plate>
    <apple class="small"></apple>
    </plate>
    <plate>
    <pickle></pickle>
    </plate>`,
    selector: '*',
    task: 'Select all elements on the table',
    name: 'all',
  },
  {
    markup: `<plate id="fancy"></plate>
    <apple></apple>
    <bento>
    <pickle></pickle>
    </bento>
    <pickle></pickle>
    <plate>
    <orange class="small"></orange>
    </plate>`,
    selector: 'pickle, apple, orange',
    task: 'Select all food on the table',
    name: 'comma',
  },
  {
    markup: `<pickle></pickle>
    <bento>
    <pickle></pickle>
    </bento>
    <plate id="fancy">
    <pickle></pickle>
    </plate>
    <plate>
    <pickle></pickle>
    </plate>`,
    selector: '#fancy > pickle',
    task: 'Select the pickle on fancy plate',
    name: 'children',
  },
  {
    markup: `<plate>
    <orange></orange>
    </plate>
    <plate id="fancy">
    <orange></orange>
    </plate>
    <bento>
    <orange class="small"></orange>
    </bento>
    <plate>
    <orange class="small"></orange>
    </plate>`,
    selector: 'orange:not(plate orange), #fancy orange',
    task: 'Select all oranges not on a regular plates',
    name: 'not only not',
  },
  {
    markup: `<bento>
    <pickle></pickle>
    </bento>
    <bento></bento>
    <apple></apple>
    <plate>
    <orange></orange>
    </plate>
    <plate>
    <apple class="small"></apple>
    </plate>`,
    selector: 'bento:first-child, plate:last-child',
    task: 'Select first bento and last plate',
    name: 'edges',
  },
  {
    markup: `<pickle></pickle>
    <pickle></pickle>
    <pickle></pickle>
    <pickle></pickle>
    <pickle></pickle>
    <pickle></pickle>
    <pickle></pickle>
    <pickle></pickle>
    <pickle></pickle>
    <pickle></pickle>
    <pickle></pickle>`,
    selector: 'pickle:nth-child(3n + 2)',
    task: 'Select every third pickle starting from second',
    name: 'every',
  },
];

export default tasksData;
