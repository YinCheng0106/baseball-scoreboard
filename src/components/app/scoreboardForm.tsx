"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";

import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export const ScoreboardSchema = z.object({
  awayColor: z.string().min(1),
  homeColor: z.string().min(1),
  homeScore: z.number().min(0),
  awayScore: z.number().min(0),
  inning: z.number().min(1),
  topOfInning: z.boolean(),
  strikes: z.number().min(0).max(3),
  balls: z.number().min(0).max(4),
  outs: z.number().min(0).max(3),
  homeName: z.string().min(1).max(20),
  awayName: z.string().min(1).max(20),
  base1: z.boolean(),
  base2: z.boolean(),
  base3: z.boolean(),
});

export type ScoreboardValues = z.infer<typeof ScoreboardSchema>;

interface ScoreboardFormProps {
  onChange?: (values: ScoreboardValues) => void;
}

export function ScoreboardForm({ onChange }: ScoreboardFormProps) {
  const form = useForm<z.infer<typeof ScoreboardSchema>>({
    resolver: zodResolver(ScoreboardSchema),
    defaultValues: {
      awayColor: "#000000",
      homeColor: "#000000",
      homeScore: 0,
      awayScore: 0,
      inning: 1,
      topOfInning: true,
      strikes: 0,
      balls: 0,
      outs: 0,
      homeName: "HOME",
      awayName: "AWAY",
      base1: false,
      base2: false,
      base3: false,
    },
  });

  const watched = useWatch({ control: form.control });
  useEffect(() => {
    onChange?.(watched as ScoreboardValues);
  }, [watched, onChange]);

  return (
    <div className="w-full">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>基本設定</FieldLegend>
            <FieldDescription>請在這邊設定基本的比賽資訊</FieldDescription>
            <FieldGroup>
              <div className="flex flex-col gap-2">
                <Field
                  orientation="horizontal"
                  className="items-center justify-between"
                >
                  <FieldLabel>客隊顏色</FieldLabel>
                  <Input
                    className="w-12"
                    type="color"
                    {...form.register("awayColor")}
                  />
                  <FieldError>
                    {form.formState.errors.awayColor?.message}
                  </FieldError>
                </Field>
                <Field
                  orientation="horizontal"
                  className="items-center justify-between"
                >
                  <FieldLabel>主隊顏色</FieldLabel>
                  <Input
                    className="w-12"
                    type="color"
                    {...form.register("homeColor")}
                  />
                  <FieldError>
                    {form.formState.errors.homeColor?.message}
                  </FieldError>
                </Field>
              </div>
            </FieldGroup>
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>客隊名稱</FieldLabel>
                  <Input type="text" {...form.register("awayName")} />
                  <FieldError>
                    {form.formState.errors.awayName?.message}
                  </FieldError>
                </Field>
                <Field>
                  <FieldLabel>主隊名稱</FieldLabel>
                  <Input type="text" {...form.register("homeName")} />
                  <FieldError>
                    {form.formState.errors.homeName?.message}
                  </FieldError>
                </Field>
              </div>
            </FieldGroup>
            <FieldSeparator />
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>客隊分數</FieldLabel>
                  <Input
                    type="number"
                    {...form.register("awayScore", { valueAsNumber: true })}
                  />
                  <FieldError>
                    {form.formState.errors.awayScore?.message}
                  </FieldError>
                </Field>
                <Field>
                  <FieldLabel>主隊分數</FieldLabel>
                  <Input
                    type="number"
                    {...form.register("homeScore", { valueAsNumber: true })}
                  />
                  <FieldError>
                    {form.formState.errors.homeScore?.message}
                  </FieldError>
                </Field>
              </div>
            </FieldGroup>
            <FieldGroup>
              <div className="grid-col-2 grid gap-4">
                <Field>
                  <FieldLabel>局數</FieldLabel>
                  <Input
                    type="number"
                    {...form.register("inning", { valueAsNumber: true })}
                  />
                  <FieldError>
                    {form.formState.errors.inning?.message}
                  </FieldError>
                </Field>
                <Field>
                  <FieldLabel>上/下半局</FieldLabel>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("topOfInning", value === "top")
                    }
                    defaultValue={form.getValues("topOfInning") ? "top" : "bot"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">上半局</SelectItem>
                      <SelectItem value="bot">下半局</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </FieldGroup>
            <FieldGroup>
              <div className="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel>好球數</FieldLabel>
                  <Input
                    type="number"
                    min={0}
                    max={3}
                    {...form.register("strikes", { valueAsNumber: true })}
                  />
                  <FieldError>
                    {form.formState.errors.strikes?.message}
                  </FieldError>
                </Field>
                <Field>
                  <FieldLabel>壞球數</FieldLabel>
                  <Input
                    type="number"
                    min={0}
                    max={4}
                    {...form.register("balls", { valueAsNumber: true })}
                  />
                  <FieldError>
                    {form.formState.errors.balls?.message}
                  </FieldError>
                </Field>
                <Field>
                  <FieldLabel>出局數</FieldLabel>
                  <Input
                    type="number"
                    min={0}
                    max={3}
                    {...form.register("outs", { valueAsNumber: true })}
                  />
                  <FieldError>{form.formState.errors.outs?.message}</FieldError>
                </Field>
              </div>
            </FieldGroup>
            <FieldGroup>
              <FieldTitle>壘包狀態</FieldTitle>
              <div className="grid grid-cols-3 gap-4">
                <Field orientation="horizontal">
                  <Checkbox
                    id="first-base"
                    {...form.register("base1")}
                    onCheckedChange={() => {
                      const current = form.getValues("base1");
                      form.setValue("base1", !current);
                    }}
                  />
                  <FieldLabel htmlFor="first-base">一壘有人</FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <Checkbox
                    id="second-base"
                    {...form.register("base2")}
                    onCheckedChange={() => {
                      const current = form.getValues("base2");
                      form.setValue("base2", !current);
                    }}
                  />
                  <FieldLabel htmlFor="second-base">二壘有人</FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <Checkbox
                    id="third-base"
                    {...form.register("base3")}
                    onCheckedChange={() => {
                      const current = form.getValues("base3");
                      form.setValue("base3", !current);
                    }}
                  />
                  <FieldLabel htmlFor="third-base">三壘有人</FieldLabel>
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
