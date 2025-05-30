import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "@/components/shared/Card";
import { Rocket } from "lucide-react";
import '@testing-library/jest-dom';

describe("BlogCard", () => {
  it("shfaq titullin dhe përshkrimin", () => {
    render(<Card icon={Rocket} title="Test" description="Përshkrimi" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("Përshkrimi")).toBeInTheDocument();
  });

  it("shfaq ikonën", () => {
    render(<Card icon={() => <Rocket data-testid="card-icon" />} title="Test" description="ikona" />);
    expect(screen.getByTestId("card-icon")).toBeInTheDocument();
  });

  it("shfaq përshkrim bosh nëse mungon", () => {
    render(<Card icon={Rocket} title="Test" description="" />);
    expect(screen.getByText("")).toBeInTheDocument();
  });
});