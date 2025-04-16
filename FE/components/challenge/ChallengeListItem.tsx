import { View, Pressable } from 'react-native';
import Margin from '@/components/ui/Margin';
import { COLORS } from '@/constants/COLORS';
import BookmarkYellow from '@/assets/svgs/Bookmark_yellow.svg';
import BookmarkWhite from '@/assets/svgs/Bookmark_white.svg';
import BookmarkDark from '@/assets/svgs/Bookmark_dark.svg';
import OutlinedShadowText from '@/constants/OutlinedShadowText';
import LabelText from '@/constants/LabelText';

interface Props {
  title: string;
  period: number;
  category: string;
  isBookmark: boolean;
  onBookmarkToggle: () => void;
}

export default ({ title, period, category, isBookmark, onBookmarkToggle }: Props) => {
  const getPeriodColor = () => {
    if (period === 30) return COLORS.pink;
    if (period === 15) return COLORS.yellow;
    if (period === 7) return COLORS.blue;
    return COLORS.green;
  };

  const getBookmark = () => {
    if (isBookmark) return <BookmarkYellow />;
    return (
      <View>
        <BookmarkDark style={{ position: "absolute", left: -1, top: -1 }} />
        <BookmarkWhite style={{ zIndex: 1 }} />
      </View>
    );
  };

  return (
    <View>
      {/* 그림자 박스 */}
      <View
        style={{
          backgroundColor: COLORS.dark,
          height: 49,
          marginTop: 1,
          marginLeft: 1,
        }}
      />
      {/* 본문 박스 */}
      <View
        style={{
          backgroundColor: COLORS.green,
          height: 48,
          position: "absolute",
          top: 0,
          left: 0,
          right: 2,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 8,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          {/* 북마크 아이콘에 터치 이벤트 부여 */}
          <Pressable onPress={onBookmarkToggle}>
            {getBookmark()}
          </Pressable>
          <Margin width={8} />
          <View style={{ flex: 1 }}>
            <OutlinedShadowText>{title}</OutlinedShadowText>
          </View>
        </View>
        <Margin width={8} />
        <View style={{ alignItems: "flex-end" }}>
          <LabelText
            style={{ backgroundColor: getPeriodColor(), fontSize: 14 }}
          >{`${period}day`}</LabelText>
          <Margin height={4} />
          <LabelText style={{ backgroundColor: COLORS.gray, fontSize: 14 }}>{`#${category}`}</LabelText>
        </View>
      </View>
    </View>
  );
};
