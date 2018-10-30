import React from 'react'
import InViewMonitor from 'react-inview-monitor'

const SectionTitle = ({ data }) => {
    return (
        <div>
            <div className="d-flex justify-content-center text-center flex-wrap mb-5">

                <InViewMonitor
                    classNameNotInView='invisible'
                    classNameInView='animated fadeInUp w-100'>
                    <h2 className="ttl medium text-uppercase">{data.title}</h2>
                </InViewMonitor>


                <InViewMonitor classNameNotInView='invisible' classNameInView='animated fadeInLeft'>
                    <div className="small-line"></div>
                </InViewMonitor>

            </div>
        </div>
    )
}

export default SectionTitle