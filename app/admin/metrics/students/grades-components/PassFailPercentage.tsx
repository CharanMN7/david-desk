"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Label } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { status: "Pass", percentage: 72, fill: "#28a745" },
  { status: "Fail", percentage: 28, fill: "#dc3545" },
];

const chartConfig = {
  pass: {
    label: "Pass",
    color: "#28a745",
  },
  fail: {
    label: "Fail",
    color: "#dc3545",
  },
} satisfies ChartConfig;

export function PassFailPercentage({ ...props }) {
  return (
    <Card className="flex flex-col" {...props}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Pass/Fail Percentage</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="percentage"
              nameKey="status"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const passData = chartData.find((d) => d.status === "Pass");
                    const failData = chartData.find((d) => d.status === "Fail");

                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy - 10}
                          className="fill-foreground text-xl font-bold"
                        >
                          {passData?.percentage}% Pass
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground text-base"
                        >
                          {failData?.percentage}% Fail
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Pass rate trending upward <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing pass/fail percentages for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
