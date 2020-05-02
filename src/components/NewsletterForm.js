import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";
import "./NewsletterForm.scss";
import { PrimaryButton2 } from "./Buttons";

const NewsletterForm = ({ location }) => {
  const [success, setSuccess] = useState(false);

  return (
    <form
      name="newsletterSubscribe"
      data-netlify="true"
      id="newsletterSubscribe"
      method="post"
      onSubmit={(event) => {
        const data = new URLSearchParams(
          new FormData(document.querySelector("#newsletterSubscribe"))
        );
        event.preventDefault();
        fetch(location.href, {
          method: "POST",
          body: data,
        })
          .then(() => {
            setSuccess(true);
          })
          .catch((err) => {
            console.error(err);
          });
      }}
    >
      <p style={{ display: success ? "block" : "none" }}>
        Thank you for subscribing!
      </p>
      <div
        style={{
          display: success ? "none" : "block",
          display: "flex",
          alignItems: "baseline",
          flexFlow: "row wrap",
          justifyContent: "center",
        }}
      >
        <span className="notice">
          Subscribe to newsletter from Housing Now!
        </span>
        <FormControl style={{ display: "block", marginRight: "4px" }}>
          <InputLabel htmlFor="newsletter-email">Email Address</InputLabel>
          <Input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            name="newsletter-email"
            style={{ boxSizing: "initial", border: "0" }}
          />
        </FormControl>
        <PrimaryButton2
          className="primaryButton"
          type="submit"
          style={{ margin: 0 }}
        >
          →
        </PrimaryButton2>
      </div>
    </form>
  );
};

export default NewsletterForm;
