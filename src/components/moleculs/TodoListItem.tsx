import React, { memo } from "react";

import {
  Typography,
  List,
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import DateFnsUtils from '@date-io/date-fns';

const TodoListItem = memo((props: any) => (
  <ListItem divider={props.divider}>
    <Checkbox
      color="primary"
      onClick={props.onCheckBoxToggle}
      checked={props.checked}
    />
    <ListItemText primary={(
      <>
      <Typography variant="subtitle1" display="block" style={{
        textDecoration: props.checked === true ? 'line-through' : 'none',
        marginBottom: 0,
        paddingBottom: 2,
        lineHeight: '1.3em'
      }}>{props.text}</Typography>
      <Typography variant="overline" display="block" style={{color: '#AAA', marginTop: 0, paddingTop: 0, lineHeight: '1.3em'}}>{props.date}</Typography>
      </>
    )} />
    <ListItemSecondaryAction>
      <IconButton onClick={props.onButtonClick} color="secondary">
        <DeleteOutlined />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
));

export default TodoListItem;
