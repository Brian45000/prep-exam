// src/components/Advice.test.js

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
// import Advice, { fetchAdvice, fetchAdviceID } from "../components/Advice.jsx";
import Advice from "../components/Advice";
import { ToastContainer } from "react-toastify";

jest.mock("axios");

describe("Advice Component", () => {
  test("renders advice component with initial state", async () => {
    axios.get.mockResolvedValue({
      data: {
        slip: { id: 1, advice: "Test advice" },
      },
    });

    render(<Advice />);

    expect(screen.getByText("Conseil du jour #")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Test advice")).toBeInTheDocument();
    });
  });

  test("fetches and displays new advice on button click", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        slip: { id: 1, advice: "First advice" },
      },
    });

    axios.get.mockResolvedValueOnce({
      data: {
        slip: { id: 2, advice: "Second advice" },
      },
    });

    render(<Advice />);

    await waitFor(() => {
      expect(screen.getByText("First advice")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Une autre !"));

    await waitFor(() => {
      expect(screen.getByText("Second advice")).toBeInTheDocument();
    });
  });

  test("fetches and displays advice by ID", async () => {
    axios.get.mockResolvedValue({
      data: {
        slip: { id: 2, advice: "Advice by ID" },
      },
    });

    render(<Advice />);
    fireEvent.change(screen.getByPlaceholderText("Enter id"), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByText("Je veux celui là !"));

    await waitFor(() => {
      expect(screen.getByText("Advice by ID")).toBeInTheDocument();
    });
  });

  test("handles API errors gracefully", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));

    render(
      <>
        <Advice />
        <ToastContainer />
      </>
    );

    fireEvent.click(screen.getByText("Une autre !"));

    await waitFor(() => {
      expect(screen.queryByText("Network Error")).toBeNull(); // No error message displayed in the UI
    });
  });
});
