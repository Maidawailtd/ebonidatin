'use client';

import type React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Upload, Star, Heart, Award, Sparkles, Crown, Zap } from 'lucide-react';
import { VerifiedBadge } from './verified-badge';

interface ProfileCustomizationProps {
  userId: string;
  currentCoverPhoto?: string;
  currentBadges?: string[];
  userVerifications?: ('email' | 'phone' | 'id' | 'model')[];
}

const availableBadges = [
  { id: 'popular', name: 'Popular', icon: Heart, color: 'bg-pink-500' },
  { id: 'premium', name: 'Premium', icon: Crown, color: 'bg-yellow-500' },
  { id: 'active', name: 'Active', icon: Zap, color: 'bg-green-500' },
  { id: 'featured', name: 'Featured', icon: Sparkles, color: 'bg-purple-500' },
  { id: 'top-rated', name: 'Top Rated', icon: Award, color: 'bg-orange-500' },
];

const stickerPacks = [
  { id: 'hearts', emoji: '❤️', name: 'Hearts' },
  { id: 'stars', emoji: '⭐', name: 'Stars' },
  { id: 'fire', emoji: '🔥', name: 'Fire' },
  { id: 'sparkles', emoji: '✨', name: 'Sparkles' },
  { id: 'crown', emoji: '👑', name: 'Crown' },
  { id: 'rose', emoji: '🌹', name: 'Rose' },
];

export function ProfileCustomization({
  userId,
  currentCoverPhoto,
  currentBadges = [],
  userVerifications = ['id', 'email'],
}: ProfileCustomizationProps) {
  const [coverPhoto, setCoverPhoto] = useState(currentCoverPhoto);
  const [selectedBadges, setSelectedBadges] = useState<string[]>(currentBadges);
  const [uploading, setUploading] = useState(false);

  const handleCoverPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('coverPhoto', file);

    try {
      const response = await fetch('/api/profile/cover-photo', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload cover photo');
      }

      const { key } = await response.json();
      setCoverPhoto(key);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const toggleBadge = async (badgeId: string) => {
    const newBadges = selectedBadges.includes(badgeId)
      ? selectedBadges.filter((b) => b !== badgeId)
      : [...selectedBadges, badgeId];

    setSelectedBadges(newBadges);

    try {
      await fetch('/api/profile/badges', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ badges: newBadges }),
      });
    } catch (error) {
      console.error('Failed to update badges', error);
      // Revert state if API call fails
      setSelectedBadges(selectedBadges);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customize Your Profile</CardTitle>
        <CardDescription>Make your profile stand out with cover photos, badges, and stickers</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="cover">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cover">Cover Photo</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="stickers">Stickers</TabsTrigger>
          </TabsList>

          <TabsContent value="cover" className="space-y-4">
            <div className="aspect-video w-full rounded-lg bg-gray-100 overflow-hidden relative">
              {coverPhoto && <img src={coverPhoto} alt="Cover Photo" className="w-full h-full object-cover" />}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Button asChild variant="secondary">
                  <label htmlFor="cover-photo-upload">
                    <Upload className="h-4 w-4 mr-2" />
                    {uploading ? 'Uploading...' : 'Upload Cover Photo'}
                    <input
                      id="cover-photo-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleCoverPhotoUpload}
                      disabled={uploading}
                      accept="image/*"
                    />
                  </label>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="badges" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {userVerifications.map((verificationType) => (
                <div key={verificationType} className="p-4 rounded-lg border-2 border-primary bg-primary/10 flex flex-col items-center gap-2">
                  <VerifiedBadge verified={true} verificationType={verificationType} size="lg" />
                </div>
              ))}
              {availableBadges.map((badge) => {
                const Icon = badge.icon;
                const isSelected = selectedBadges.includes(badge.id);

                return (
                  <button
                    key={badge.id}
                    onClick={() => toggleBadge(badge.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isSelected ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`p-3 rounded-full ${badge.color}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-sm font-medium">{badge.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4">
              <p className="text-sm text-muted-foreground">Selected badges will appear on your profile</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {userVerifications.map((verificationType) => (
                  <VerifiedBadge key={verificationType} verified={true} verificationType={verificationType} />
                ))}
                {selectedBadges.map((badgeId) => {
                  const badge = availableBadges.find((b) => b.id === badgeId);
                  if (!badge) return null;
                  const Icon = badge.icon;
                  return (
                    <Badge key={badgeId} className={badge.color}>
                      <Icon className="h-3 w-3 mr-1" />
                      {badge.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stickers" className="space-y-4">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {stickerPacks.map((pack) => (
                <div key={pack.id} className="p-4 rounded-lg border-2 border-border flex flex-col items-center gap-2 cursor-pointer hover:border-primary/50">
                  <span className="text-4xl">{pack.emoji}</span>
                  <span className="text-sm font-medium">{pack.name}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Stickers will be available to use in your chats and comments (coming soon!)</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
