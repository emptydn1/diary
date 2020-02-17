import React, { useState } from "react";
import { TextField, TextareaAutosize, Button } from "@material-ui/core";
import "./App.css";
import { useForm } from "react-hook-form";
import { createEntry } from "./api";

const LogEntryForm = ({ addLocation, onClose, loadEntrys }) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();

  const onSubmit = async data => {
    const { latitude, longitude } = addLocation;
    try {
      data.latitude = latitude;
      data.longitude = longitude;
      const created = await createEntry(data);
      loadEntrys(created);
      onClose();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        height: 400,
        width: 300
      }}
    >
      <TextField
        name="title"
        label="title"
        helperText={error ? "loi" : "ok"}
        variant="outlined"
        inputRef={register}
      />
      <TextField
        name="description"
        label="description"
        variant="outlined"
        inputRef={register}
        helperText={error ? "loi" : "ok"}
      />
      <TextField
        name="image"
        label="image"
        variant="outlined"
        inputRef={register}
        helperText={error ? "loi" : "ok"}
      />
      <TextareaAutosize
        aria-label="minimum height"
        rowsMin={4}
        name="comments"
        ref={register}
        placeholder="comments"
      />
      <TextField
        id="date"
        label="Birthday"
        type="date"
        name="visitDate"
        inputRef={register}
        defaultValue="2017-05-24"
        helperText={error ? "loi" : "ok"}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Button type="submit" variant="contained" color="primary">
        Create
      </Button>
    </form>
  );
};

export default LogEntryForm;
