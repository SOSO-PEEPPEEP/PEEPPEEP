package com.peeppeep.global.util;

public class util {

    /**
    *    소문자 형태로 표준화
    *    @param userId
    *    @return String
    */
    public static String normalizeId(String userId) {
        StringBuilder result = new StringBuilder();
        userId = userId.toLowerCase();

        for (int i = 0; i < userId.length(); i++) {
            char c = userId.charAt(i);
            if (c == '-' || c == ' ') {
                continue;
            }
            result.append(c);
        }
        return result.toString();
    }

    /**
     * 문자열 null 또는 공백일 때 true, 아니면 false
     * @param str
     * @return boolean
     */
    public static boolean isEmpty(String str) {
        if (str == null)
            return true;
        if (str.length() == 0) {
            return true;
        }
        return false;
    }

    /**
     * 두 문자열의 값을 비교하여 동일할 경우 true, 다를 경우 false
     * @param password
     * @param confirmPassword
     * @return boolean
     */
    public static boolean verifyPassword(String password, String confirmPassword) {
        if (password == null) {
            if (confirmPassword == null)
                return true;
            return false;
        } else {
            return password.equals(confirmPassword);
        }
    }

    /**
     * 문장 종료 이후에 존재하는 공백 제거 (구동결과 확인 필요)
     * @param str
     * @return String
     */
    public static String getTrim(String str) {
        try {
            return str == null ? str : str.trim();
        } catch (Exception e) {
            return str;
        }
    }

    /**
     * 문자열 길이 제한
     * @param str
     * @param lengthLimit
     * @return String
     */
    public static String limitStringLength(String str, int lengthLimit) {
        byte[] strArr = str.getBytes();
        int length = Math.min(strArr.length, lengthLimit);
        byte[] retArr = new byte[strArr.length];

        for (int i = 0; i < length; i++) {
            retArr[i] = strArr[i];
        }
        return new String(retArr).trim();
    }

    /**
     * 이메일 유효성체크
     * @param email
     * @return
     */
    public static boolean isValidEmail(String email) {
        return email.matches("^[_a-z0-9A-Z-]+(.[_a-z0-9A-Z-]+)*@(?:\\w+\\.)+\\w+$");
    }

    /**
     * 비밀번호 유효성체크(8~16자, 특수문자 1개 이상 필수, 영문자 1개 이상 필수, 숫자 1개 이상 필수, )
     * @param pwd
     * @return
     */
    public static boolean isValidPwd(String pwd) {
        if(pwd.matches(".{8,16}")) {
            if(pwd.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]+.*")) {
                if(pwd.matches(".*[a-zA-Z]+.*")) {
                    if(pwd.matches(".*[0-9]+.*")) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * 인증번호 6자리
     */
    public static String getRandomStr(){
        char[] tmp = new char[6];
        int random = 0;

        for(int i=0; i<tmp.length;i++){
            random = (int)(Math.random()*58)+65;
            if((91>random || random>96)){
                tmp[i]= (char)random;
            }else{
                i--;
            }
        }
        return new String(tmp, 0, 6);
    }

}
