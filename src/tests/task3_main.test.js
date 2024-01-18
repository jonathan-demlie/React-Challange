import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CandidateList from "../components/CandidateList";

describe("Candidate List Component", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <CandidateList />
      </MemoryRouter>
    );
  });

  it('displays the "Search skills" input', () => {
    render(
      <MemoryRouter>
        <CandidateList />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("search skills")).toBeInTheDocument();
  });

  it('displays the "All" button', () => {
    render(
      <MemoryRouter>
        <CandidateList />
      </MemoryRouter>
    );

    expect(screen.getByText("All")).toBeInTheDocument();
  });
});
