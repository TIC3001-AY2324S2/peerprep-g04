import React, { useState } from "react";
import { Button, Card } from "flowbite-react";
import { Stepper } from "../components/matcher/stepper";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../components/common/AuthProvider";

function CategorySelection({ setValue }) {
  const handleButtonClick = (category) => {
    setValue("category", category);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        outline
        gradientDuoTone="purpleToBlue"
        onClick={() => handleButtonClick("Array")}
      >
        Array
      </Button>
      <Button
        outline
        gradientDuoTone="cyanToBlue"
        onClick={() => handleButtonClick("String")}
      >
        String
      </Button>
      <Button
        outline
        gradientDuoTone="greenToBlue"
        onClick={() => handleButtonClick("Binary tree")}
      >
        Binary tree
      </Button>
      <Button
        outline
        gradientDuoTone="purpleToPink"
        onClick={() => handleButtonClick("Sorting")}
      >
        Sorting
      </Button>
      <Button
        outline
        gradientDuoTone="pinkToOrange"
        onClick={() => handleButtonClick("Linked Lists")}
      >
        Linked Lists
      </Button>
      <Button
        outline
        gradientDuoTone="tealToLime"
        onClick={() => handleButtonClick("Algorithms")}
      >
        Algorithms
      </Button>
      <Button
        outline
        gradientDuoTone="redToYellow"
        onClick={() => handleButtonClick("Graphs")}
      >
        Graphs
      </Button>
    </div>
  );
}

function ComplexitySelection({ setValue }) {
  const handleButtonClick = (complexity) => {
    setValue("complexity", complexity);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        outline
        gradientDuoTone="purpleToBlue"
        onClick={() => handleButtonClick("Easy")}
      >
        Easy
      </Button>
      <Button
        outline
        gradientDuoTone="cyanToBlue"
        onClick={() => handleButtonClick("Medium")}
      >
        Medium
      </Button>
      <Button
        outline
        gradientDuoTone="greenToBlue"
        onClick={() => handleButtonClick("Hard")}
      >
        Hard
      </Button>
    </div>
  );
}

export default function MatchingPage() {
  const { user, logout } = useAuth();
  // ----------------------------------
  // FORM VALIDATIONS - with ZOD
  // ----------------------------------
  const schema = z.object({
    category: z.string().min(1, "Please enter a category"),
    complexity: z.string().min(1, "Please select a complexity"),
  });
  const [currentStep, setCurrentStep] = useState(0);
  const initialFormValues = {
    status: "JOIN",
    userId: user.userDetails._id,
    category: "",
    complexity: "",
    matchType: "SAME",
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialFormValues,
  });

  const watchAllFields = watch();

  return (
    <div className="w-full max-w-2xl">
      <Stepper currentStep={currentStep} />
      <pre>{JSON.stringify(watchAllFields, null, 2)}</pre>
      <div className="flex flex-wrap gap-2 mt-10">
        {currentStep === 0 && <CategorySelection setValue={setValue} />}
        {currentStep === 1 && <ComplexitySelection setValue={setValue} />}
        {currentStep === 2 && <>Review your selection</>}
      </div>
      <div className="flex flex-column mt-10 justify-end">
        <Button onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
        <Button onClick={() => setCurrentStep(currentStep + 1)}>
          Next
          <HiOutlineArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
