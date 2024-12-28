import FaqComp from "./faqComp";

export default function FaqList() {
    return (
        <div className="flex justify-between gap-20 w-full">
            <div className="flex flex-col gap-7 w-full pl-10">
                <FaqComp
                    question="What is the origin of your gemstones?"
                    message="Our gemstones are sourced from some of the finest locations worldwide, including Sri Lanka, Madagascar, and Myanmar. Each gemstone is ethically mined and carefully selected for its quality and authenticity."
                />
                <FaqComp
                    question="How can I request the price of a gemstone?"
                    message="If you're interested in a specific gemstone, simply click the 'Request Price' button of the product, and we'll get back to you with the price details."
                />
                <FaqComp
                    question="What is your return policy for gemstones?"
                    message="We offer an easy return and refund policy within 30 days of purchase, provided the gemstone is in its original condition. For further details, refer to our Return Policy section."
                />
            </div>
            <div className="flex flex-col gap-7 w-full pr-10">
                <FaqComp
                    question="What is your return policy for gemstones?"
                    message="We offer an easy return and refund policy within 30 days of purchase, provided the gemstone is in its original condition. For further details, refer to our Return Policy section."
                />
                <FaqComp
                    question="Do you ship internationally?"
                    message="Yes, we ship our gemstones to various countries worldwide. International shipping times and fees will vary based on your location."
                />
                <FaqComp
                    question="How long does shipping take?"
                    message="We offer complimentary shipping, and delivery typically takes 5-7 business days for domestic orders. For international shipping, delivery may take 10-14 business days, depending on your location."
                />
            </div>
        </div>
    )
};
