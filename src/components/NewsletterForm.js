import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText
} from "@material-ui/core";
import "./NewsletterForm.scss";
import { PrimaryButton2 } from "./Buttons";

const NewsletterForm = () => {
  return (
    <form
      name="newsletterSubscribe"
      data-netlify="true"
      id="newsletterSubscribe"
    >
      <span className="notice">Subscribe to newsletter from Housing Now!</span>
      <FormControl>
        <InputLabel htmlFor="newsletter-email">Email Address</InputLabel>
        <Input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          style={{ boxSizing: "initial", border: "0" }}
        />
      </FormControl>
      <input type="hidden" name="form-name" value="contact" />
      <PrimaryButton2 className="primaryButton" type="submit">
        →
      </PrimaryButton2>
    </form>
  );
};

export default NewsletterForm;
