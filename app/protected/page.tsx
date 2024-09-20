"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface VehicleInfo {
  Make?: string;
  Model?: string;
  ModelYear?: string;
  VehicleType?: string;
  BodyClass?: string;
  EngineCylinders?: string;
  FuelTypePrimary?: string;
  TransmissionStyle?: string;
  [key: string]: string | undefined; // To capture any additional fields
}

const VINSearchComponent = () => {
  const [vin, setVin] = useState("");
  const [year, setYear] = useState<number | undefined>(undefined);
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setVehicleInfo(null);
    setIsLoading(true);

    if (vin.length !== 17) {
      toast({
        title: "Invalid VIN",
        description: "VIN must be 17 characters long.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: "Searching Vehicle Database",
      description: "Please wait while we fetch the vehicle information.",
    });

    try {
      const response = await axios.get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinExtended/${vin}?format=json${year ? `&modelyear=${year}` : ''}`
      );
      const results = response.data.Results;
      
      // Log the full response for debugging
      console.log('Full API Response:', results);
      
      const info: VehicleInfo = {};
      results.forEach((item: { Variable: string; Value: string }) => {
        if (item.Value && item.Value !== "Not Applicable") {
          info[item.Variable] = item.Value;
        }
      });

      setVehicleInfo(info);
      toast({
        title: "Vehicle Information Found",
        description: "The vehicle details have been retrieved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while fetching vehicle information.",
        variant: "destructive",
      });
      console.error("Error fetching VIN data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>VIN Search</CardTitle>
        <CardDescription>Enter a VIN to retrieve vehicle information.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="vin">Vehicle Identification Number (VIN)</Label>
              <Input
                id="vin"
                placeholder="Enter 17-character VIN"
                value={vin}
                onChange={(e) => setVin(e.target.value.toUpperCase())}
                maxLength={17}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="year">Model Year (Optional)</Label>
              <Input
                id="year"
                type="number"
                placeholder="Enter Model Year"
                value={year || ''}
                onChange={(e) => setYear(e.target.value ? parseInt(e.target.value) : undefined)}
              />
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>
        </form>
      </CardContent>
      {vehicleInfo && (
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Vehicle Information:</h3>
          <ul className="list-disc pl-5">
            <li>Make: {vehicleInfo.Make || 'N/A'}</li>
            <li>Model: {vehicleInfo.Model || 'N/A'}</li>
            <li>Year: {vehicleInfo.ModelYear || 'N/A'}</li>
            <li>Vehicle Type: {vehicleInfo.VehicleType || 'N/A'}</li>
            <li>Body Class: {vehicleInfo.BodyClass || 'N/A'}</li>
            <li>Engine Cylinders: {vehicleInfo.EngineCylinders || 'N/A'}</li>
            <li>Fuel Type: {vehicleInfo.FuelTypePrimary || 'N/A'}</li>
            <li>Transmission Style: {vehicleInfo.TransmissionStyle || 'N/A'}</li>
            {/* Add more fields here as needed */}
          </ul>
        </CardContent>
      )}
    </Card>
  );
};

export default function ProtectedPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        router.push('/sign-in');
      }
    };
    fetchUser();
  }, [router, supabase.auth]);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-8 items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome to Your Dashboard</h1>
        <p className="text-xl">Hello, {user.email}!</p>
      </div>
      <VINSearchComponent />
    </div>
  );
}
