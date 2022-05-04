import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import transferPanel from './components/transfer-panel';
import transferOperate from './components/transfer-operate';
import { transferProps, TTransferProps, TKey } from './transfer-types';
import { transferState } from './composables/use-transfer';
import './transfer.scss';

export default defineComponent({
  name: 'DTransfer',
  components: {
    transferPanel,
    transferOperate
  },
  props: transferProps,
  setup(props: TTransferProps, ctx: SetupContext) {
    const { sourceTitle, targetTitle, sourceDisabled, targetDisabled,
      sourceData,
      targetData,
      sourceDefaultChecked,
      targetDefaultChecked,
      sourceDirection,
      targetDirection,
      updteSourceAllCheckedHandle,
      updteTargetAllCheckedHandle,
      updateSourceCheckedHandle,
      updateTargetCheckedHandle,
      toMoveTargetHandle,
      toMoveSourceHandle
    } = transferState(props, ctx);
    return () => {
      return <div class="devui-transfer">
        {ctx.slots.header && ctx.slots.header()}
        <transferPanel
          isSearch={props.isSearch}
          isKeyupSearch={props.isKeyupSearch}
          height={props.height}
          unit={props.unit}
          placeholder={props.placeholder}
          sortMethods={props.sourceSortMethods}
          searching={props.searching}
          title={sourceTitle.value}
          data={sourceData.value}
          defaultChecked={sourceDefaultChecked.value}
          direction={sourceDirection.value}
          v-slots={{
            header: ctx.slots.sourceHeader,
            body: ctx.slots.sourceBody
          }}
          onUpdteAllChecked={(value: TKey[]) => {
            updteSourceAllCheckedHandle(value);
          }}
          onChangeChecked={(value: TKey[]) => {
            updateSourceCheckedHandle(value);
          }}
        >
        </transferPanel>
        <transferOperate
          sourceDisabled={sourceDisabled.value}
          targetDisabled={targetDisabled.value}
          v-slots={{ ...ctx.slots }}
          onToTarget={() => {
            toMoveTargetHandle();
          }}
          onToSource={() => {
            toMoveSourceHandle();
          }}
        ></transferOperate>
        <transferPanel
          isSearch={props.isSearch}
          isKeyupSearch={props.isKeyupSearch}
          height={props.height}
          unit={props.unit}
          placeholder={props.placeholder}
          sortMethods={props.targetSortMethods}
          searching={props.searching}
          title={targetTitle.value}
          data={targetData.value}
          defaultChecked={targetDefaultChecked.value}
          direction={targetDirection.value}
          v-slots={{
            header: ctx.slots.targetHeader,
            body: ctx.slots.targetBody
          }}
          onUpdteAllChecked={(value: TKey[]) => {
            updteTargetAllCheckedHandle(value);
          }}
          onChangeChecked={(value: TKey[]) => {
            updateTargetCheckedHandle(value);
          }}
        >
        </transferPanel>
      </div>;
    };
  }
});
