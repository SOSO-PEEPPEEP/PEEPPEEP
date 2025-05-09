import { useState, useEffect } from 'react';
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import Frame from '@/components/ui/Frame';
import EffectSound from '@/components/common/effectSound';
import VoiceSound from '@/components/common/voiceSound';
import GlobalText from '@/constants/GlobalText';
import { petStyles } from "@/styles/pet.styles";
import { useRouter } from 'expo-router';
import back from "@/assets/images/icon/icon_back.png";
import { PetRank, bgColor } from '@/components/pet/util';
import { API_BASE_URL } from '@/constants/env';
import OutlinedShadowText from '@/constants/OutlinedShadowText';

interface PetCollectionFromServer {
  petCollectionId: number;
  name: string;
  petRank : PetRank;
  adultImage : string;
  petType: string;
}

interface PetCollectionListProps {
  id: number;
  name: string;
  rank : PetRank;
  image : string;
  type : string;
}

export default () => {
  const [playEffect, setPlayEffect] = useState(false);
  const [voiceEffect, setVoiceEffect] = useState(false);

  const router = useRouter();
  const [petCollectionList, setPetCollectionList] = useState<PetCollectionListProps[]>([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/pets/collections`);
        const json = await response.json();
        const data = json.data;
    
        const parsedList: PetCollectionListProps[] = data.map((item: PetCollectionFromServer) => ({
          id: item.petCollectionId,
          name: item.name,
          rank : item.petRank,
          image : item.adultImage,
          type : item.petType,
      }));

      setPetCollectionList(parsedList);
      } catch (err) {
        console.error('펫 도감 목록 조회 실패:', err);
      }
    };
    fetchPets();
  }, []);

  const backButton = () => {
    router.push('/main/pet');
  };

  return (
    <Frame>
        <View style={petStyles.pageTitle}>
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', }}>
            <TouchableOpacity onPress={() => { setPlayEffect(true); backButton(); }} activeOpacity={1}> 
              <View style={{width: 30, height: 30, marginRight: 8, alignItems: 'center', justifyContent: 'center', }}>
                <Image source={back} style={{width: 30, height: 30}}></Image>
              </View>
            </TouchableOpacity>
            <GlobalText style={petStyles.pageTitleText}>PEEP 도감</GlobalText>
          </View>
        </View>
        <ScrollView style={{width: '100%', paddingRight: 4, flex: 1,}} contentContainerStyle={{ paddingBottom: 0 }} showsVerticalScrollIndicator={false}  showsHorizontalScrollIndicator={false}>
            <View style={petStyles.collectionList}>
            {petCollectionList.map((collections) => (
              <TouchableOpacity key={collections.id.toString()} onPress={() => { setVoiceEffect(true); router.push(`/main/pet/collection/detail?id=${collections.id}`); }} activeOpacity={1}>
                  <View style={petStyles.collectionCard}>
                      <View style={petStyles.bookmark}></View>
                      <View style={petStyles.collections}>
                          <View style={[petStyles.collectionShadow]}> 
                          </View>
                          <View style={[petStyles.collection, {backgroundColor: bgColor(collections.rank)}]}> 
                              <View style={petStyles.collectionPetImg}>
                                  <Image style={{ width: 72, height: 72, }} source={{uri:collections.image}}></Image>
                              </View>
                              <View style={petStyles.collectionInfoBox}>
                                <GlobalText style={[petStyles.collectionInfoText, {marginRight: 8}]}>{collections.type} / {collections.rank.charAt(0)}</GlobalText>
                              </View>
                              <View style={petStyles.collectionNameBox}>
                                <OutlinedShadowText>{collections.name}</OutlinedShadowText>
                              </View>
                          </View>
                      </View>
                      <View style={{alignItems: 'center',}}>
                          <View style={petStyles.collectionEntryNumber}>
                              <GlobalText style={petStyles.collectionEntryNumberText}>No.{collections.id}</GlobalText>
                          </View>
                      </View>
                  </View>  
              </TouchableOpacity>
            ))}

            {/* pet list가 홀수면 빈 카드 추가 */}
            {petCollectionList.length % 2 === 1 && (
                <View style={petStyles.collectionCard}>
                    <View style={[petStyles.bookmark, {backgroundColor: 'none'}]}></View>
                    <View style={petStyles.collections}>
                        <View style={[petStyles.collectionShadow, {backgroundColor: 'none', borderWidth: 0,}]}> 
                        </View>
                        <View style={[petStyles.collection, {backgroundColor: 'none', borderWidth: 0,}]}> 
                            <View style={petStyles.collectionInfoBox}>
                            </View>
                            <View style={petStyles.collectionNameBox}>
                            </View>
                        </View>
                    </View>
                    <View style={{alignItems: 'center',}}>
                        <View style={[petStyles.collectionEntryNumber, {backgroundColor: 'none',}]}>
                        </View>
                    </View>
                </View>  
            )}
            </View>                           
        </ScrollView>
        <View style={{height: 40, width: '100%'}}></View>

    {playEffect && ( <EffectSound onPlaybackEnd={() => setPlayEffect(false)} />)}
    {voiceEffect && ( <VoiceSound onPlaybackEnd={() => setVoiceEffect(false)} />)}
    </Frame>
  );
};