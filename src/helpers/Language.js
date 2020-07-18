import AsyncStorage from '@react-native-community/async-storage'
import { I18nManager } from 'react-native'
import RNRestart from 'react-native-restart'
import strings from '../strings';

const defaultLanguageCode = 'en'

export const languageSwitcher = {

    async startup() { 
        const languageCode = await this.getCurrentLanguageCode()
        await this.switchTo(languageCode)
    },

    async switchTo(languageCode) {
        strings.setLanguage(languageCode)
        await this.saveLanguageCode(languageCode)
        const rtlLangCodes = ['ar']
        const selectedLanIsRTL = rtlLangCodes.includes(languageCode)

        // Restart App If necessary
        const { isRTL, forceRTL, allowRTL } = I18nManager
        if (selectedLanIsRTL !== isRTL) {
            allowRTL(selectedLanIsRTL)
            forceRTL(selectedLanIsRTL)
            setTimeout(() =>    RNRestart.Restart(), 10);

        }

    },

    // English And Arabic Toggle
    async toggleLanguages() {
        let languageCode = await AsyncStorage.getItem('languageCode')

        if (languageCode === defaultLanguageCode) {
            languageCode = 'en'
        } else {
            languageCode = defaultLanguageCode
        }
        await this.switchTo(languageCode)
    },
    
    async getCurrentLanguageCode() {
        let languageCode = await AsyncStorage.getItem('languageCode')
        if (!languageCode) { languageCode = defaultLanguageCode }
        return languageCode
    },

    async saveLanguageCode(languageCode) {
        await AsyncStorage.setItem('languageCode', languageCode, (error) => {
            if (error) { throw error }
        })
    },

}