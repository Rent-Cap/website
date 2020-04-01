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
  const [action, setAction] = useState();

  useEffect(() => {
    let currentHost =
      location && location.host
        ? location.host
        : process.env.GATSBY_CONTEXT_URL;

    const { pathname, search, hash } = location;
    const actionUrl = new URL(`${currentHost}${pathname}${search}${hash}`);
    actionUrl.searchParams.append("contact", "success");

    setAction(actionUrl.href);

    if (location.href) {
      const { searchParams } = new URL(location.href);
      if (searchParams.get("contact")) {
        setSuccess(true);
      }
    }
  }, [location]);

  return (
    <form
      name="newsletterSubscribe"
      data-netlify="true"
      id="newsletterSubscribe"
      method="post"
      action={action}
    >
      {success ? (
        <p>Thank you for subscribing!</p>
      ) : (
        <>
          <span className="notice">
            Subscribe to newsletter from Housing Now!
          </span>
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
        </>
      )}
    </form>
  );
};

export default NewsletterForm;
