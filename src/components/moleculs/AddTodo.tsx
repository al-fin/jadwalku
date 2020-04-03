import React, { memo } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const AddTodo = memo((props: any) => (
  <>
    <Grid container spacing={1} justify="center" alignItems="flex-end">
      <Grid item xs={6}>
        <TextField
          label="Judul Tugas"
          value={props.inputValue}
          onChange={props.onInputChange}
          onKeyPress={props.onInputKeyPress}
          fullWidth
          style={{marginBottom: 8}}
        />
      </Grid>
      <Grid item xs={6}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Deadline"
            value={props.selectedDate}
            onChange={props.handleDateChange}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    </Grid>
    <Grid xs={12} item>
      <Button disableElevation color="primary" variant="contained" onClick={props.onButtonClick} style={{
        width: '100%',
        fontWeight: 'bold'
      }} disabled={props.inputValue === ""}>Tambahkan Tugas</Button>
    </Grid>
    </>
  ));

export default AddTodo;
