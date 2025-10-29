import { useTranslation } from "react-i18next";

const Loading = () => {
    const { t } = useTranslation();
    return (
        <div className="flex justify-center items-center py-6">
            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            <span className="ml-2 text-sm text-gray-500">{t("load")}...</span>
        </div>
    );

}

export default Loading;