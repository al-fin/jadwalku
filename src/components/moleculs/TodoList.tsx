import React, { memo } from "react";
import { List, Paper } from "@material-ui/core";

import TodoListItem from "./TodoListItem";

const TodoList = memo((props: any) => (
  <>
    {props.items.length > 0 && (
      <Paper style={{ margin: 0, marginTop: 16 }}>
        <List style={{ overflow: "auto" }}>
          {props.items.sort(function(a: any, b: any){
              var a1= a.timestamps, b1= b.timestamps;
              if(a1=== b1) return 0;
              return b1> a1? 1: -1;
          }).map((todo: any, idx: number) => (
            <TodoListItem
              {...todo}
              key={`TodoItem.${idx}`}
              divider={idx !== props.items.length - 1}
              onButtonClick={() => props.onItemRemove(idx)}
              onCheckBoxToggle={() => props.onItemCheck(idx)}
            />
          ))}
        </List>
      </Paper>
    )}
  </>
));

export default TodoList;
