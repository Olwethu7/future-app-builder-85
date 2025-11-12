import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";

interface ExperienceAddOnsProps {
  selectedExperiences: string[];
  onSelectionChange: (experiences: string[]) => void;
}


export const ExperienceAddOns = ({
  selectedExperiences,
  onSelectionChange,
}: ExperienceAddOnsProps) => {
  const { data: experiences } = useQuery({
    queryKey: ["available-experiences"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .eq("available", true)
        .limit(5);
      
      if (error) throw error;
      return data;
    },
  });

  const toggleExperience = (id: string) => {
    if (selectedExperiences.includes(id)) {
      onSelectionChange(selectedExperiences.filter((expId) => expId !== id));
    } else {
      onSelectionChange([...selectedExperiences, id]);
    }
  };

  const totalExperienceCost = experiences
    ?.filter((exp) => selectedExperiences.includes(exp.id))
    .reduce((sum, exp) => sum + (exp.price || 0), 0) || 0;

  if (!experiences || experiences.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Enhance Your Stay</span>
          {totalExperienceCost > 0 && (
            <Badge variant="secondary">+R{totalExperienceCost}</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Add authentic cultural experiences to your booking
        </p>
        
        <div className="space-y-3">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <Checkbox
                id={experience.id}
                checked={selectedExperiences.includes(experience.id)}
                onCheckedChange={() => toggleExperience(experience.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <label
                  htmlFor={experience.id}
                  className="font-medium cursor-pointer block mb-1"
                >
                  {experience.title}
                </label>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {experience.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{experience.duration}h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>Max {experience.max_participants}</span>
                  </div>
                  <span className="font-semibold text-primary">
                    R{experience.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
